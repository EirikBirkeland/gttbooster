module.exports = function calculateType(freeDaysLeft, paidDaysLeft) {
    if (freeDaysLeft <= 0 && paidDaysLeft <= 0) {
        return "Expired"
    } else if (freeDaysLeft && !paidDaysLeft) {
        return "Trial"
    } else if (!freeDaysLeft && paidDaysLeft) {
        return "Subscription"
    } else if (freeDaysLeft && paidDaysLeft) {
        return "Subscription"
    } else if (freeDaysLeft < 0 && paidDaysLeft < 0) {
        return "Trial (+ subscription)"
    } else {
        return "Invalid sub.?"
    }
}