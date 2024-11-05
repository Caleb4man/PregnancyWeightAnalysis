class PregnancyWeightTracker {
    // Constructor takes initial weight (in lbs) and height (in inches) as input
    constructor(initialWeightInLbs, heightInInches) {
        this.initialWeight = initialWeightInLbs; // Initial weight at the start of pregnancy
        this.height = heightInInches; // Height of the person in inches
        this.currentWeight = initialWeightInLbs; // Current weight (starts as initial weight)
        this.week = 0; // Current week of pregnancy, initialized to 0
        this.bmi = this.calculateBMI(); // Calculate BMI based on initial weight and height
        this.weightGainRecommendations = this.getWeightGainRange(); // Set weight gain range based on BMI
    }

    // Method to calculate BMI using the formula: (weight in lbs / (height in inches)^2) * 703
    calculateBMI() {
        return (this.initialWeight / (this.height * this.height)) * 703;
    }

    // Method to get the weight gain range based on the BMI category
    getWeightGainRange() {
        if (this.bmi < 18.5) {
            // Underweight: recommended weight gain is between 28 and 40 lbs
            return { min: 28, max: 40 };
        } else if (this.bmi < 24.9) {
            // Normal weight: recommended weight gain is between 25 and 35 lbs
            return { min: 25, max: 35 };
        } else if (this.bmi < 29.9) {
            // Overweight: recommended weight gain is between 15 and 25 lbs
            return { min: 15, max: 25 };
        } else {
            // Obesity: recommended weight gain is between 11 and 20 lbs
            return { min: 11, max: 20 };
        }
    }

    // Method to update the current weight
    updateWeight(newWeightInLbs) {
        this.currentWeight = newWeightInLbs;
    }

    // Method to update the current week of pregnancy
    updateWeek(week) {
        if (week < 1 || week > 40) {
            throw new Error("Week must be between 1 and 40."); // Validate that the week is between 1 and 40
        }
        this.week = week;
    }

    // Method to calculate the weight change from the initial weight
    getWeightChange() {
        return this.currentWeight - this.initialWeight;
    }

    // Method to get the weight gain status based on current weight, initial weight, and pregnancy week
    getWeightGainStatus() {
        const weightChange = this.getWeightChange(); // Calculate the difference in weight
        let recommendedGainMin = 0; // Minimum recommended weight gain up to this week
        let recommendedGainMax = 0; // Maximum recommended weight gain up to this week

        // Calculate recommended weight gain based on the week of pregnancy
        if (this.week <= 12) {
            // First trimester (weeks 1-12): total gain should be 1-4.5 lbs
            recommendedGainMin = Math.max(0, (1 / 12) * this.week); // Minimum of 1 lb over 12 weeks
            recommendedGainMax = Math.min(4.5, (4.5 / 12) * this.week); // Maximum of 4.5 lbs over 12 weeks
        } else if (this.week <= 26) {
            // Second trimester (weeks 13-26): gain of 1-2 lbs per week
            const weeksInSecondTrimester = this.week - 12;
            recommendedGainMin = Math.max(4.5, 1 + (weeksInSecondTrimester * 1)); // Minimum cumulative gain
            recommendedGainMax = Math.min(18, 4.5 + (weeksInSecondTrimester * 2)); // Maximum cumulative gain (total up to 18 lbs)
        } else {
            // Third trimester (weeks 27-40): gain of 1-2 lbs per week
            const weeksInThirdTrimester = this.week - 26;
            recommendedGainMin = Math.max(18, 4.5 + (weeksInThirdTrimester * 1)); // Minimum cumulative gain
            recommendedGainMax = Math.min(25, 4.5 + (weeksInThirdTrimester * 2)); // Maximum cumulative gain (total up to 25 lbs)
        }

        // Compare the actual weight change to the recommended range
        if (weightChange < recommendedGainMin) {
            return "Underweight for this week.";
        } else if (weightChange > recommendedGainMax) {
            return "Overweight for this week.";
        } else {
            return "Weight gain is on track for this week.";
        }
    }
}
