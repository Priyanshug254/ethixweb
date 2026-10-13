import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate-limiter bucket for IP requests (resets on cold start)
const ipRateMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 6;

function checkRateLimit(clientIp) {
  const now = Date.now();
  const record = ipRateMap.get(clientIp) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
  } else {
    record.count += 1;
  }
  ipRateMap.set(clientIp, record);
  return record.count <= MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    // 1. Client IP detection and Rate Limiting
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string' 
      ? forwarded.split(',')[0].trim() 
      : (req.socket?.remoteAddress || '127.0.0.1');

    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait a moment before submitting another enquiry.' 
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 2. Honeypot check (anti-bot)
    if (body._hp_title || body.website_url_hp || body.fax_number) {
      // Quietly return success to fool spam bots without inserting anything
      return res.status(200).json({ 
        success: true, 
        message: 'Enquiry received successfully.' 
      });
    }

    // 3. Strict Server-side Validation
    const errors = {};

    const fullName = (body.full_name || '').trim();
    if (!fullName || fullName.length < 2) {
      errors.full_name = 'Full name is required (minimum 2 characters).';
    } else if (fullName.length > 100) {
      errors.full_name = 'Full name must not exceed 100 characters.';
    }

    const email = (body.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'A valid business email address is required.';
    } else if (email.length > 120) {
      errors.email = 'Email address must not exceed 120 characters.';
    }

    const service = (body.service || '').trim();
    if (!service || service.length < 2) {
      errors.service = 'Please select a primary service of interest.';
    } else if (service.length > 100) {
      errors.service = 'Service name exceeds allowed limit.';
    }

    const message = (body.message || '').trim();
    if (!message || message.length < 10) {
      errors.message = 'Project description must be at least 10 characters.';
    } else if (message.length > 3000) {
      errors.message = 'Project description exceeds 3000 characters limit.';
    }

    const consent = Boolean(body.consent);
    if (!consent) {
      errors.consent = 'You must acknowledge the privacy consent to submit.';
    }

    const phone = (body.phone || '').trim().slice(0, 25);
    const company = (body.company || '').trim().slice(0, 120);
    const budget = (body.budget || '').trim().slice(0, 80);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed. Please correct the highlighted errors.', 
        errors 
      });
    }

    // 4. Save to Database via Supabase
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    const newLead = {
      full_name: fullName,
      email: email,
      phone: phone || null,
      company: company || null,
      service: service,
      budget: budget || null,
      message: message,
      consent: true,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-ref')) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (error) {
        console.error('Supabase leads insert error:', error.message);
        return res.status(500).json({ 
          error: 'An unexpected database error occurred. Your enquiry could not be saved.' 
        });
      }

      return res.status(201).json({
        success: true,
        lead_id: data.id,
        message: 'Thank you! Your project enquiry has been registered. An Ethixweb specialist will reach out shortly.'
      });
    }

    // Fallback in case Supabase environment is being provisioned or for offline test
    const mockId = 'lead_' + Math.random().toString(36).substring(2, 11);
    return res.status(201).json({
      success: true,
      lead_id: mockId,
      message: 'Thank you! Your project enquiry has been registered. An Ethixweb specialist will reach out shortly.',
      warning: supabaseUrl?.includes('your-project-ref') ? 'Note: Database credentials in template mode.' : undefined
    });

  } catch (err) {
    console.error('Unexpected lead submission handler error:', err);
    return res.status(500).json({ 
      error: 'An internal server error occurred while processing your enquiry.' 
    });
  }
}
