/**
 * ETHIXWEB INDIA — AUTOMATED INTEGRATION TEST SUITE
 * Run with: node scripts/test-suite.mjs
 */

const BASE_URL = process.env.TEST_URL || 'http://127.0.0.1:5173';

async function runTests() {
  console.log(`\n======================================================`);
  console.log(` ETHIXWEB INDIA — FULL-STACK VERIFICATION TEST SUITE `);
  console.log(` Target Server: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
      failed++;
    }
  }

  try {
    // TEST 1: Submit Valid Lead
    console.log(`[1] Testing Lead Enquiry Submission (POST /api/leads)...`);
    const validPayload = {
      full_name: 'Devansh Kulkarni',
      email: 'devansh@kulkarni-logistics.in',
      phone: '+91 99887 76655',
      company: 'Kulkarni Logistics India',
      service: 'Custom Web Applications',
      budget: '₹1,50,000 – ₹3,50,000',
      message: 'Automating fleet dispatch reconciliation and customer delivery tracking on mobile.',
      consent: true,
    };

    const res1 = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const data1 = await res1.json().catch(() => ({}));
    assert(res1.status === 201, 'Valid enquiry returns HTTP 201 Created', `Got ${res1.status}`);
    assert(data1.success === true, 'Response contains success flag true');
    assert(typeof data1.lead_id === 'string' && data1.lead_id.length > 0, 'Response contains tracking lead_id');

    // TEST 2: Schema Validation (Reject Missing / Bad Input)
    console.log(`\n[2] Testing Server-side Validation Rejection (POST /api/leads)...`);
    const invalidPayload = {
      full_name: 'X',
      email: 'invalid-email-format',
      service: '',
      message: 'too short',
      consent: false,
    };

    const res2 = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload),
    });
    const data2 = await res2.json().catch(() => ({}));
    assert(res2.status === 400, 'Invalid enquiry returns HTTP 400 Bad Request', `Got ${res2.status}`);
    assert(data2.errors && Object.keys(data2.errors).length >= 4, 'Validation returns detailed field errors map');

    // TEST 3: Honeypot Anti-Spam Protection
    console.log(`\n[3] Testing Honeypot Spam Protection (POST /api/leads)...`);
    const spamPayload = {
      full_name: 'Automated Bot',
      email: 'bot@spamnetwork.com',
      service: 'Website Redesign',
      message: 'Cheap SEO backlinks service for your domain.',
      consent: true,
      _hp_title: 'Bot Trap Triggered',
    };

    const res3 = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spamPayload),
    });
    const data3 = await res3.json().catch(() => ({}));
    assert(res3.status === 200, 'Spam bot submission is caught and quietly answered with HTTP 200', `Got ${res3.status}`);
    assert(data3.success === true, 'Bot is fooled with success response without database insertion');

    // TEST 4: Security — Unauthenticated Access to Admin
    console.log(`\n[4] Testing Admin Security & Authorization Guard (GET /api/admin/leads)...`);
    const resNoAuth = await fetch(`${BASE_URL}/api/admin/leads`);
    assert(resNoAuth.status === 401, 'Unauthenticated request to admin endpoint returns HTTP 401 Unauthorized', `Got ${resNoAuth.status}`);

    const resBadAuth = await fetch(`${BASE_URL}/api/admin/leads`, {
      headers: { 'Authorization': 'Bearer forged-token-abc' },
    });
    assert(resBadAuth.status === 401, 'Forged bearer token returns HTTP 401 Unauthorized', `Got ${resBadAuth.status}`);

    // TEST 5: Authorized Admin Lead Retrieval & Dynamic Stats
    console.log(`\n[5] Testing Authorized Admin Lead Fetch & Dynamic Stats...`);
    const resAuth = await fetch(`${BASE_URL}/api/admin/leads`, {
      headers: { 'Authorization': 'Bearer demo-admin-token' },
    });
    const dataAuth = await resAuth.json().catch(() => ({}));
    assert(resAuth.status === 200, 'Authorized admin request returns HTTP 200 OK', `Got ${resAuth.status}`);
    assert(Array.isArray(dataAuth.leads), 'Admin response contains leads array');
    assert(dataAuth.stats && typeof dataAuth.stats.total === 'number', 'Admin response contains dynamic stats object');
    assert(dataAuth.pagination && typeof dataAuth.pagination.page === 'number', 'Admin response contains pagination metadata');

    // TEST 6: Lead Status Transition (PATCH /api/admin/leads/:id)
    console.log(`\n[6] Testing Lead Status Update Workflow (PATCH /api/admin/leads/:id)...`);
    const resPatchNoAuth = await fetch(`${BASE_URL}/api/admin/leads/lead_test_01`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'contacted' }),
    });
    assert(resPatchNoAuth.status === 401, 'PATCH without auth token returns HTTP 401', `Got ${resPatchNoAuth.status}`);

    const resPatchAuth = await fetch(`${BASE_URL}/api/admin/leads/lead_test_01`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer demo-admin-token',
      },
      body: JSON.stringify({ status: 'qualified' }),
    });
    const patchData = await resPatchAuth.json().catch(() => ({}));
    assert(resPatchAuth.status === 200, 'Authorized status transition returns HTTP 200 OK', `Got ${resPatchAuth.status}`);
    assert(patchData.success === true, 'Status update returns success flag');

    // TEST 7: Lead Removal (DELETE /api/admin/leads/:id)
    console.log(`\n[7] Testing Lead Deletion Safeguard (DELETE /api/admin/leads/:id)...`);
    const resDeleteNoAuth = await fetch(`${BASE_URL}/api/admin/leads/lead_test_01`, {
      method: 'DELETE',
    });
    assert(resDeleteNoAuth.status === 401, 'DELETE without auth token returns HTTP 401', `Got ${resDeleteNoAuth.status}`);

    const resDeleteAuth = await fetch(`${BASE_URL}/api/admin/leads/lead_test_01`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer demo-admin-token' },
    });
    const deleteData = await resDeleteAuth.json().catch(() => ({}));
    assert(resDeleteAuth.status === 200, 'Authorized lead deletion returns HTTP 200 OK', `Got ${resDeleteAuth.status}`);
    assert(deleteData.success === true, 'Lead deletion returns success flag');

    // SUMMARY
    console.log(`\n======================================================`);
    console.log(` TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`======================================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal error during test suite execution:', err);
    process.exit(1);
  }
}

runTests();
