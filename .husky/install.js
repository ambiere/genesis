if (process.env.NODE_ENV === "production" || process.env.CI === "1") {
  process.exit(0)
}
const husky = await import("husky")
husky()
