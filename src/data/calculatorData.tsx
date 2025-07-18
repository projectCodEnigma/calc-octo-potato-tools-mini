import React from 'react';
import BudgetCalculator from '../components/calculators/BudgetCalculator';
import SalaryConverter from '../components/calculators/SalaryConverter';
import LoanCalculator from '../components/calculators/LoanCalculator';
import SavingsGoalCalculator from '../components/calculators/SavingsGoalCalculator';
import ROICalculator from '../components/calculators/ROICalculator';
import CPMCalculator from '../components/calculators/CPMCalculator';
import BMICalculator from '../components/calculators/BMICalculator';
import CalorieCalculator from '../components/calculators/CalorieCalculator';
import BillSplitter from '../components/calculators/BillSplitter';
import AgeCalculator from '../components/calculators/AgeCalculator';
import UnitConverter from '../components/calculators/UnitConverter';
import SleepCalculator from '../components/calculators/SleepCalculator';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator';
import InvestmentCalculator from '../components/calculators/InvestmentCalculator';
import CurrencyConverter from '../components/calculators/CurrencyConverter';
import WaterIntakeCalculator from '../components/calculators/WaterIntakeCalculator';
import BodyFatCalculator from '../components/calculators/BodyFatCalculator';
import HeartRateCalculator from '../components/calculators/HeartRateCalculator';
import PaceCalculator from '../components/calculators/PaceCalculator';
import ScientificCalculator from '../components/calculators/ScientificCalculator';
import PercentageCalculator from '../components/calculators/PercentageCalculator';
import FractionCalculator from '../components/calculators/FractionCalculator';
import DateCalculator from '../components/calculators/DateCalculator';
import PasswordGenerator from '../components/calculators/PasswordGenerator';
import ElectricityBillCalculator from '../components/calculators/ElectricityBillCalculator';
import RecipeConverter from '../components/calculators/RecipeConverter';
import FreelancerRateCalculator from '../components/calculators/FreelancerRateCalculator';
import OvertimePayCalculator from '../components/calculators/OvertimePayCalculator';
import DebtSnowballCalculator from '../components/calculators/DebtSnowballCalculator';
import EmergencyFundCalculator from '../components/calculators/EmergencyFundCalculator';
import RentAffordabilityCalculator from '../components/calculators/RentAffordabilityCalculator';
import NetWorthCalculator from '../components/calculators/NetWorthCalculator';
import ChildcareExpenseCalculator from '../components/calculators/ChildcareExpenseCalculator';
import VacationSavingsCalculator from '../components/calculators/VacationSavingsCalculator';
import WorkHoursIncomeCalculator from '../components/calculators/WorkHoursIncomeCalculator';
import BreakEvenCalculator from '../components/calculators/BreakEvenCalculator';
import ConversionRateCalculator from '../components/calculators/ConversionRateCalculator';
import LTVCACCalculator from '../components/calculators/LTVCACCalculator';
import CustomerChurnCalculator from '../components/calculators/CustomerChurnCalculator';
import MarketingBudgetAllocator from '../components/calculators/MarketingBudgetAllocator';
import SocialMediaEngagementCalculator from '../components/calculators/SocialMediaEngagementCalculator';
import FunnelDropoffCalculator from '../components/calculators/FunnelDropoffCalculator';
import ROASCalculator from '../components/calculators/ROASCalculator';

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: 'finance' | 'marketing' | 'health' | 'everyday' | 'math';
  color: string;
  component: React.ComponentType;
}

export const calculatorData: Calculator[] = [
  // Finance Tools
  {
    id: 'budget-calculator',
    name: 'Budget Calculator',
    description: 'Track your income and expenses to create a balanced budget',
    category: 'finance',
    color: 'bg-green-500',
    component: BudgetCalculator
  },
  {
    id: 'salary-converter',
    name: 'Salary to Hourly Converter',
    description: 'Convert annual salary to hourly wage and vice versa',
    category: 'finance',
    color: 'bg-green-600',
    component: SalaryConverter
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments, interest, and amortization schedules',
    category: 'finance',
    color: 'bg-green-700',
    component: LoanCalculator
  },
  {
    id: 'savings-goal',
    name: 'Savings Goal Calculator',
    description: 'Plan how much to save monthly to reach your financial goals',
    category: 'finance',
    color: 'bg-emerald-500',
    component: SavingsGoalCalculator
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and total loan costs',
    category: 'finance',
    color: 'bg-green-800',
    component: MortgageCalculator
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth over time',
    category: 'finance',
    color: 'bg-emerald-600',
    component: CompoundInterestCalculator
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Plan your investment strategy and calculate future returns',
    category: 'finance',
    color: 'bg-green-400',
    component: InvestmentCalculator
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different world currencies',
    category: 'finance',
    color: 'bg-emerald-700',
    component: CurrencyConverter
  },
  
  // Marketing Tools
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate return on investment for marketing campaigns',
    category: 'marketing',
    color: 'bg-blue-500',
    component: ROICalculator
  },
  {
    id: 'cpm-calculator',
    name: 'CPM/CPC Calculator',
    description: 'Calculate cost per mille and cost per click for advertising',
    category: 'marketing',
    color: 'bg-blue-600',
    component: CPMCalculator
  },
  
  // Health Tools
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health category',
    category: 'health',
    color: 'bg-orange-500',
    component: BMICalculator
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate daily caloric needs based on your goals',
    category: 'health',
    color: 'bg-orange-600',
    component: CalorieCalculator
  },
  {
    id: 'water-intake',
    name: 'Water Intake Calculator',
    description: 'Calculate your daily water intake needs based on activity',
    category: 'health',
    color: 'bg-blue-500',
    component: WaterIntakeCalculator
  },
  {
    id: 'body-fat-calculator',
    name: 'Body Fat Calculator',
    description: 'Calculate body fat percentage using various methods',
    category: 'health',
    color: 'bg-orange-700',
    component: BodyFatCalculator
  },
  {
    id: 'heart-rate-calculator',
    name: 'Heart Rate Calculator',
    description: 'Calculate target heart rate zones for exercise',
    category: 'health',
    color: 'bg-red-500',
    component: HeartRateCalculator
  },
  {
    id: 'pace-calculator',
    name: 'Pace Calculator',
    description: 'Calculate running/walking pace, time, and distance',
    category: 'health',
    color: 'bg-blue-600',
    component: PaceCalculator
  },
  
  // Math Calculators
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    description: 'Advanced calculator with scientific functions',
    category: 'math',
    color: 'bg-indigo-600',
    component: ScientificCalculator
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and changes',
    category: 'math',
    color: 'bg-green-500',
    component: PercentageCalculator
  },
  {
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions',
    category: 'math',
    color: 'bg-blue-700',
    component: FractionCalculator
  },

  // Everyday Tools
  {
    id: 'bill-splitter',
    name: 'Bill Splitter',
    description: 'Split bills and calculate tips among multiple people',
    category: 'everyday',
    color: 'bg-purple-500',
    component: BillSplitter
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days',
    category: 'everyday',
    color: 'bg-purple-600',
    component: AgeCalculator
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'everyday',
    color: 'bg-purple-700',
    component: UnitConverter
  },
  {
    id: 'sleep-calculator',
    name: 'Sleep Calculator',
    description: 'Find the best bedtime based on sleep cycles',
    category: 'everyday',
    color: 'bg-indigo-500',
    component: SleepCalculator
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate date differences and add/subtract time periods',
    category: 'everyday',
    color: 'bg-purple-800',
    component: DateCalculator
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options',
    category: 'everyday',
    color: 'bg-green-600',
    component: PasswordGenerator
  },
  {
    id: 'electricity-bill',
    name: 'Electricity Bill Calculator',
    description: 'Calculate electricity costs and analyze appliance usage',
    category: 'everyday',
    color: 'bg-yellow-600',
    component: ElectricityBillCalculator
  },
  {
    id: 'recipe-converter',
    name: 'Recipe Converter',
    description: 'Scale recipes up or down and convert measurements',
    category: 'everyday',
    color: 'bg-orange-500',
    component: RecipeConverter
  }, // 👈 this comma was likely missing
  {
    id: 'freelancer-rate',
    name: 'Freelancer Rate Calculator',
    description: 'Calculate your ideal hourly/project rate based on income goals',
    category: 'finance',
    color: 'bg-green-500',
    component: FreelancerRateCalculator
  },
  {
    id: 'overtime-pay',
    name: 'Overtime Pay Calculator',
    description: 'Estimate earnings from overtime hours based on your base rate',
    category: 'finance',
    color: 'bg-blue-600',
    component: OvertimePayCalculator
  },
  {
    id: 'debt-snowball',
    name: 'Debt Snowball Calculator',
    description: 'Plan a step-by-step payoff strategy for multiple debts',
    category: 'finance',
    color: 'bg-blue-700',
    component: DebtSnowballCalculator
  },
  {
    id: 'emergency-fund',
    name: 'Emergency Fund Calculator',
    description: 'Calculate how much you need saved for 3–6 months of expenses',
    category: 'finance',
    color: 'bg-green-700',
    component: EmergencyFundCalculator
  },
  {
    id: 'rent-affordability',
    name: 'Rent Affordability Calculator',
    description: 'Determine how much rent you can afford based on income',
    category: 'finance',
    color: 'bg-blue-500',
    component: RentAffordabilityCalculator
  },
  {
    id: 'net-worth',
    name: 'Net Worth Calculator',
    description: 'Calculate your total assets minus liabilities',
    category: 'finance',
    color: 'bg-green-800',
    component: NetWorthCalculator
  },
  {
    id: 'childcare-expense',
    name: 'Childcare Expense Calculator',
    description: 'Estimates monthly or annual costs for childcare',
    category: 'finance',
    color: 'bg-pink-500',
    component: ChildcareExpenseCalculator
  },
  {
    id: 'vacation-savings',
    name: 'Vacation Savings Calculator',
    description: 'Plans how much you need to save monthly for a target vacation amount',
    category: 'finance',
    color: 'bg-blue-500',
    component: VacationSavingsCalculator
  },
  {
    id: 'work-hours-income',
    name: 'Work Hours to Income Calculator',
    description: 'Converts weekly/daily work hours into expected income',
    category: 'finance',
    color: 'bg-indigo-500',
    component: WorkHoursIncomeCalculator
  },
  
  // Marketing Tools
  {
    id: 'break-even',
    name: 'Break-Even Point Calculator',
    description: 'Calculates how many units you need to sell to break even',
    category: 'marketing',
    color: 'bg-blue-500',
    component: BreakEvenCalculator
  },
  {
    id: 'conversion-rate',
    name: 'Conversion Rate Calculator',
    description: 'Determines percentage of users who take a desired action',
    category: 'marketing',
    color: 'bg-blue-600',
    component: ConversionRateCalculator
  },
  {
    id: 'ltv-cac-ratio',
    name: 'LTV/CAC Ratio Calculator',
    description: 'Compares customer lifetime value to acquisition cost',
    category: 'marketing',
    color: 'bg-blue-700',
    component: LTVCACCalculator
  },
  {
    id: 'customer-churn',
    name: 'Customer Churn Calculator',
    description: 'Measures the percentage of customers lost over time',
    category: 'marketing',
    color: 'bg-red-500',
    component: CustomerChurnCalculator
  },
  {
    id: 'marketing-budget-allocator',
    name: 'Marketing Budget Allocator',
    description: 'Divides total marketing budget across various platforms',
    category: 'marketing',
    color: 'bg-blue-800',
    component: MarketingBudgetAllocator
  },
  {
    id: 'social-media-engagement',
    name: 'Social Media Engagement Calculator',
    description: 'Calculates engagement % based on likes, comments, followers',
    category: 'marketing',
    color: 'bg-pink-500',
    component: SocialMediaEngagementCalculator
  },
  {
    id: 'funnel-dropoff',
    name: 'Funnel Drop-off Calculator',
    description: 'Calculates drop-off % between funnel stages',
    category: 'marketing',
    color: 'bg-red-600',
    component: FunnelDropoffCalculator
  },
  {
    id: 'roas-calculator',
    name: 'ROAS Calculator (eCommerce)',
    description: 'Calculates Return on Ad Spend (Revenue ÷ Ad Spend)',
    category: 'marketing',
    color: 'bg-green-700',
    component: ROASCalculator
  }
];