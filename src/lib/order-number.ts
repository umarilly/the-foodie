export function generateOrderNumber(): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const randomPart = crypto.randomUUID().split("-")[0].toUpperCase();
  return `FD-${datePart}-${randomPart}`;
}
