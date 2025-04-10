
// For fixing the type error with status
const formattedBranch = {
  ...values,
  status: values.status as "active" | "maintenance" | "closed",
}
