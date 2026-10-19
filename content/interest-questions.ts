import type { PracticeQuestion } from "./practice-questions";

// Original CEPath self-study questions, published with Product Owner approval.
// Source/calculation checks do not imply independent academic review.
export const interestQuestions: readonly PracticeQuestion[] = [
  {
    id: "mste-interest-simple-nine-months", lessonId: "mste-economy-simple-compound-interest",
    type: "single-answer", displayOrder: 1, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "How much simple interest is earned over the nine months?",
    given: "A contractor places ₱80,000 in a reserve at 6% simple annual interest for 9 months. Use months/12 for elapsed years, with no additional cash flows, fees or taxes. Round the interest to centavos.",
    options: [
      { id: "short-duration", text: "₱900.00" },
      { id: "interest-only", text: "₱3,600.00" },
      { id: "whole-year", text: "₱4,800.00" },
      { id: "months-as-years", text: "₱43,200.00" },
    ],
    correctOptionId: "interest-only",
    explanation: "The rate is annual, so nine months is 0.75 years. Simple interest uses only the original principal. The question asks for interest, not principal plus interest.",
    solution: {
      required: "Simple interest I, in PHP, over the nine-month term.",
      steps: [
        { explanation: "Convert the percentage to a decimal and match duration to its annual period.", equation: String.raw`i=0.06\text{ per year},\qquad n=\frac{9}{12}=0.75\text{ years}` },
        { explanation: "Apply the simple-interest formula to the unchanged original principal.", equation: String.raw`I=Pin=(80{,}000)(0.06)(0.75)=3{,}600\ \text{PHP}` },
        { explanation: "Check by taking three quarters of a full year's ₱4,800 interest. If the future total were requested, add the principal once.", equation: String.raw`F=P+I=80{,}000+3{,}600=83{,}600\ \text{PHP}` },
      ],
      answer: "₱3,600.00 in simple interest.",
      interpretation: "The nine-month interest is smaller than a full year's interest at the same rate. ₱83,600 would be the future amount, not the requested interest.",
    },
  },
  {
    id: "mste-interest-compound-three-years", lessonId: "mste-economy-simple-compound-interest",
    type: "single-answer", displayOrder: 2, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What is the total reserve at the end of year 3?",
    given: "An engineering team invests ₱75,000 at 4% compounded annually for three complete years. Interest stays invested; there are no other cash flows, fees or taxes. Round the future amount to centavos.",
    options: [
      { id: "simple-future", text: "₱84,000.00" },
      { id: "one-period", text: "₱78,000.00" },
      { id: "compound-future", text: "₱84,364.80" },
      { id: "interest-not-total", text: "₱9,364.80" },
    ],
    correctOptionId: "compound-future",
    explanation: "Annual compounding applies a factor of 1.04 three times. Using a simple-interest factor would omit interest earned on earlier credited interest. Subtracting the principal would give interest rather than the future total.",
    solution: {
      required: "Future total F at the end of year 3, in PHP.",
      steps: [
        { explanation: "Match the annual compounding period with the three complete years.", equation: String.raw`P=75{,}000\ \text{PHP},\qquad i=0.04,\qquad n=3` },
        { explanation: "Calculate the accumulation factor without rounding intermediate balances.", equation: String.raw`(1+i)^n=(1.04)^3=1.124864` },
        { explanation: "Multiply the original reserve by that factor.", equation: String.raw`F=75{,}000(1.124864)=84{,}364.80\ \text{PHP}` },
        { explanation: "Check by successive annual balances: ₱78,000, ₱81,120 and ₱84,364.80. Interest alone is the final balance minus the original reserve.", equation: String.raw`I=84{,}364.80-75{,}000=9{,}364.80\ \text{PHP}` },
      ],
      answer: "₱84,364.80 at the end of year 3.",
      interpretation: "The modeled balance exceeds the ₱84,000 annual-simple-interest result under matched assumptions. This remains a single reserve with retained interest, not a series of installments.",
    },
  },
  {
    id: "mste-interest-monthly-effective-rate", lessonId: "mste-economy-simple-compound-interest",
    type: "single-answer", displayOrder: 3, status: "published", reviewStatus: "source-calculation-checked",
    prompt: "What effective annual rate corresponds to this quotation?",
    given: "The nominal annual interest rate is 12%, compounded monthly at a constant rate. Interest remains invested throughout one complete year; ignore fees and taxes. Round the effective annual rate to four decimal places as a percentage.",
    options: [
      { id: "monthly-rate", text: "1.0000% effective annually" },
      { id: "nominal-rate", text: "12.0000% effective annually" },
      { id: "annual-yield", text: "12.6825% effective annually" },
      { id: "factor-as-interest", text: "112.6825% effective annually" },
    ],
    correctOptionId: "annual-yield",
    explanation: "A nominal annual quotation of 12% with monthly compounding assigns 1% to each month. Twelve reinvestment steps produce the effective annual growth. The accumulation factor includes the original principal, so subtract one before converting the rate to percent.",
    solution: {
      required: "Effective annual rate, as a percentage, to four decimal places.",
      steps: [
        { explanation: "Divide the nominal annual decimal quotation by twelve to obtain the monthly rate.", equation: String.raw`i=\frac{j}{m}=\frac{0.12}{12}=0.01\text{ per month}` },
        { explanation: "Accumulate for twelve monthly periods and subtract the original unit principal.", equation: String.raw`\mathrm{EAR}=(1.01)^{12}-1\approx0.1268250301` },
        { explanation: "Convert the decimal rate to a percentage and round only the final display.", equation: String.raw`100(0.1268250301)\%\approx12.6825\%` },
      ],
      answer: "12.6825% effective annually.",
      interpretation: "The nominal annual quotation stays 12%; the modeled annual interest growth is about 12.6825%. Neither the 1% monthly rate nor the 112.6825% accumulated-principal factor is the effective annual interest rate.",
    },
  },
];
