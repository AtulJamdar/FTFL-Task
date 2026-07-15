const DEFAULT_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';
const SLOT_ID = process.env.SLOT_ID;
const REQUEST_COUNT = Number(process.env.CONCURRENT_REQUESTS || 20);

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeBaseUrl = (value) => value.replace(/\/+$/, '');

const getTargetSlot = async (baseUrl) => {
  const response = await fetch(`${baseUrl}/slots`);
  if (!response.ok) {
    throw new Error(`Failed to fetch slots: ${response.status}`);
  }

  const slots = await response.json();
  if (!Array.isArray(slots)) {
    throw new Error('Unexpected slot response from backend');
  }

  if (SLOT_ID) {
    const slot = slots.find((candidate) => candidate._id === SLOT_ID);
    if (!slot) {
      throw new Error(`Slot ${SLOT_ID} was not found`);
    }
    return slot;
  }

  const candidateSlot = slots.find((slot) => slot.capacity >= REQUEST_COUNT)
    || slots.find((slot) => slot.capacity > 0);

  if (!candidateSlot) {
    throw new Error('No slot is available for concurrency testing');
  }

  return candidateSlot;
};

const runConcurrencyTest = async () => {
  const baseUrl = normalizeBaseUrl(DEFAULT_BASE_URL);
  const slot = await getTargetSlot(baseUrl);
  const slotId = slot._id;

  const requests = Array.from({ length: REQUEST_COUNT }, (_, index) => ({
    userId: `concurrency-user-${index + 1}`,
  }));

  const results = await Promise.allSettled(
    requests.map(async ({ userId }) => {
      const response = await fetch(`${baseUrl}/slots/${slotId}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const body = await response.text();
      let parsedBody = null;
      try {
        parsedBody = JSON.parse(body);
      } catch (_error) {
        parsedBody = body;
      }

      return {
        status: response.status,
        body: parsedBody,
      };
    })
  );

  const normalizedResults = results.map((item) => {
    if (item.status === 'fulfilled') {
      return item.value;
    }
    return {
      status: 500,
      body: item.reason?.message || 'Request failed',
    };
  });

  const successCount = normalizedResults.filter((result) => result.status === 201).length;
  const conflictCount = normalizedResults.filter((result) => result.status === 409).length;
  const errorCount = normalizedResults.filter((result) => result.status >= 500).length;

  await wait(500);

  const afterResponse = await fetch(`${baseUrl}/slots`);
  const slots = await afterResponse.json();
  const updatedSlot = slots.find((candidate) => candidate._id === slotId);

  console.log(JSON.stringify({
    slotId,
    requested: REQUEST_COUNT,
    successCount,
    conflictCount,
    errorCount,
    results: normalizedResults,
    updatedSlot,
  }, null, 2));
};

runConcurrencyTest().catch((error) => {
  console.error(error);
  process.exit(1);
});
