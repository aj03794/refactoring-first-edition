const high = daysTempRange().getHigh()
const withinPlan = plan.withinRange(low, high)

// Change into

withinPlan = plan.withinRange(daysTempRange())