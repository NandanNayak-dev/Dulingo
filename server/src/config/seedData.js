import { Category } from '../models/Category.js';
import { Lesson } from '../models/Lesson.js';

export const seedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount > 0) {
      console.log('[Seed] Categories already present in database, skipping seed.');
      return;
    }

    console.log('[Seed] Seeding civic categories and public service lessons...');

    const categories = await Category.insertMany([
      {
        title: 'Travel & Transport',
        slug: 'travel-transport',
        icon: 'Bus',
        tag: 'Most Popular for Seniors',
        description: 'Concessional bus passes, senior railway rules, and public transit navigation.',
        colorHex: '#059669',
        bgLight: '#ecfdf5',
        order: 1,
      },
      {
        title: 'Pensions & Senior Care',
        slug: 'pensions-senior-care',
        icon: 'Coins',
        tag: 'Social Security',
        description: 'Old-age pension schemes, monthly assistance, and digital life proof (Jeevan Pramaan).',
        colorHex: '#d97706',
        bgLight: '#fffbeb',
        order: 2,
      },
      {
        title: 'Government Certificates',
        slug: 'government-certificates',
        icon: 'FileCheck',
        tag: 'Citizen Identity',
        description: 'Income, caste, residence, and family tree certificates on Seva Sindhu / Nadakacheri.',
        colorHex: '#4f46e5',
        bgLight: '#eef2ff',
        order: 3,
      },
      {
        title: 'Electricity & Utilities',
        slug: 'electricity-utilities',
        icon: 'Zap',
        tag: 'Household Living',
        description: 'Gruha Jyothi zero bill subsidy, BESCOM meter connections, and utility bill tracking.',
        colorHex: '#0284c7',
        bgLight: '#f0f9ff',
        order: 4,
      },
      {
        title: 'Property Tax & e-Khata',
        slug: 'property-tax',
        icon: 'Building2',
        tag: 'Civic Property',
        description: 'Self-assessment property tax payments, e-Khata verification, and municipal receipts.',
        colorHex: '#9333ea',
        bgLight: '#faf5ff',
        order: 5,
      },
      {
        title: 'Public Grievances & Sakala',
        slug: 'grievances-sakala',
        icon: 'HelpCircle',
        tag: 'Citizen Rights',
        description: 'Filing complaints on Janaspandana, Sakala time-bound delivery, and RTI applications.',
        colorHex: '#e11d48',
        bgLight: '#fff1f2',
        order: 6,
      },
    ]);

    const catMap = {};
    categories.forEach((c) => {
      catMap[c.slug] = c._id;
    });

    await Lesson.insertMany([
      {
        title: 'BMTC Senior Citizen Concessional Bus Pass',
        categoryId: catMap['travel-transport'],
        language: 'en',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        explanationText:
          'In Bengaluru, senior citizens aged 60 and above are eligible for subsidized bus travel across all non-AC BMTC bus routes. The pass offers up to 50% discount on regular daily and monthly fares. To apply, you do not need an agent; you simply submit age proof such as your Aadhaar card or Voter ID, two passport-sized photographs, and residential verification. Application can be initiated online via Seva Sindhu or in person at Bangalore One centers and Kempegowda Bus Station.',
        nativeExplanationText:
          'ಬೆಂಗಳೂರಿನಲ್ಲಿ 60 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಯಸ್ಸಿನ ಹಿರಿಯ ನಾಗರಿಕರು ಬಿಎಂಟಿಸಿ ಸಾಮಾನ್ಯ ಬಸ್‌ಗಳಲ್ಲಿ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಪ್ರಯಾಣಿಸಲು ಅರ್ಹರಾಗಿದ್ದಾರೆ. ಈ ಪಾಸು ದೈನಂದಿನ ಮತ್ತು ಮಾಸಿಕ ಪ್ರಯಾಣದಲ್ಲಿ ಶೇಕಡಾ 50 ರಷ್ಟು ರಿಯಾಯಿತಿ ನೀಡುತ್ತದೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಆಧಾರ್ ಕಾರ್ಡ್, ವೋಟರ್ ಐಡಿ ಮತ್ತು ಎರಡು ಫೋಟೋಗಳು ಬೇಕಾಗುತ್ತವೆ. ಇದನ್ನು ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಬೆಂಗಳೂರು ಒನ್ ಕೇಂದ್ರಗಳಲ್ಲಿ ಸುಲಭವಾಗಿ ಪಡೆಯಬಹುದು.',
        keyPoints: [
          'Age requirement: 60 years or older on the date of application.',
          'Proof documents: Aadhaar Card, Voter Identity Card, or Passport.',
          'Two passport size recent color photographs.',
          'Valid on all BMTC Ordinary/City services (excluding Vayu Vajra airport AC).',
          'Application location: Seva Sindhu portal or Bangalore One service desks.',
        ],
        officialSourceUrl: 'https://mybmtc.karnataka.gov.in',
        officialDepartment: 'Bangalore Metropolitan Transport Corporation (BMTC)',
        lastVerifiedDate: new Date('2026-03-01'),
        status: 'published',
        viewsCount: 24,
        completionCount: 8,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'Welcome to this lesson on the BMTC Senior Citizen Concessional Bus Pass.',
            nativeText: 'ಬಿಎಂಟಿಸಿ ಹಿರಿಯ ನಾಗರಿಕರ ರಿಯಾಯಿತಿ ಬಸ್ ಪಾಸ್ ಕುರಿತ ಈ ಪಾಠಕ್ಕೆ ಸುಸ್ವಾಗತ.',
          },
          {
            seconds: 6,
            text: 'Citizens who have reached 60 years of age qualify for discounted city bus travel across Bengaluru.',
            nativeText: '60 ವರ್ಷ ತುಂಬಿದ ಹಿರಿಯ ನಾಗರಿಕರು ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಪ್ರಯಾಣಿಸಬಹುದು.',
          },
          {
            seconds: 14,
            text: 'You will need an Aadhaar card or Voter ID as age proof and residential address evidence.',
            nativeText: 'ವಯಸ್ಸು ಮತ್ತು ವಿಳಾಸದ ದೃಢೀಕರಣಕ್ಕಾಗಿ ನೀವು ಆಧಾರ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ ನೀಡಬೇಕು.',
          },
          {
            seconds: 22,
            text: 'Never pay extra fees to unofficial brokers; standard pass fees are paid directly at Bangalore One counters.',
            nativeText: 'ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬೇಡಿ; ನಿಗದಿತ ಶುಲ್ಕವನ್ನು ಬೆಂಗಳೂರು ಒನ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಪಾವತಿಸಿ.',
          },
          {
            seconds: 30,
            text: 'After submitting, your smart bus pass is issued within five working days.',
            nativeText: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ಐದು ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಬಸ್ ಪಾಸ್ ಲಭ್ಯವಾಗುತ್ತದೆ.',
          },
        ],
      },
      {
        title: 'Sandhya Suraksha Pension Scheme',
        categoryId: catMap['pensions-senior-care'],
        language: 'en',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        explanationText:
          'The Sandhya Suraksha Yojana is a flagship social security scheme by the Government of Karnataka. It provides a monthly financial pension of Rs 1,200 directly transferred into the beneficiary bank account of destitute and low-income senior citizens aged 65 and above. The combined annual family income of the applicant and their spouse must not exceed Rs 50,000. Village Accountants (Grama Adhikari) and Revenue Inspectors verify the applicant’s residential credentials before final sanction by the Tahsildar.',
        nativeExplanationText:
          'ಸಂಧ್ಯಾ ಸುರಕ್ಷಾ ಯೋಜನೆಯು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಯೋಜನೆಯಾಗಿದೆ. ಇದು 65 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಯಸ್ಸಿನ ಬಡ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಮಾಸಿಕ 1,200 ರೂಪಾಯಿಗಳ ಪಿಂಚಣಿಯನ್ನು ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡುತ್ತದೆ. ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ 50,000 ರೂಪಾಯಿ ಮೀರಿರಬಾರದು. ಗ್ರಾಮ ಆಡಳಿತಾಧಿಕಾರಿಗಳು ಪರಿಶೀಲನೆ ನಡೆಸಿದ ನಂತರ ತಹಶೀಲ್ದಾರ್ ಅನುಮೋದನೆ ನೀಡುತ್ತಾರೆ.',
        keyPoints: [
          'Age eligibility: 65 years and above.',
          'Pension amount: Rs 1,200 credited monthly directly via DBT into bank/post office account.',
          'Annual family income ceiling: Less than Rs 50,000 per year.',
          'Required documents: Age certificate/Aadhaar, income declaration, and active bank passbook.',
          'Sanctioning authority: Office of the Tahsildar under Sakala timeline.',
        ],
        officialSourceUrl: 'https://dssp.karnataka.gov.in',
        officialDepartment: 'Directorate of Social Security and Pensions, Karnataka',
        lastVerifiedDate: new Date('2026-02-15'),
        status: 'published',
        viewsCount: 19,
        completionCount: 5,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'Understanding Karnataka’s Sandhya Suraksha Old-Age Pension scheme.',
            nativeText: 'ಕರ್ನಾಟಕದ ಸಂಧ್ಯಾ ಸುರಕ್ಷಾ ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ ಯೋಜನೆಯ ವಿವರಣೆ.',
          },
          {
            seconds: 6,
            text: 'This scheme grants financial dignity to citizens who are 65 years or older without adequate family support.',
            nativeText: 'ಈ ಯೋಜನೆಯು 65 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಬೆಂಬಲವಿಲ್ಲದ ಹಿರಿಯರಿಗೆ ಆರ್ಥಿಕ ನೆರವು ನೀಡುತ್ತದೆ.',
          },
          {
            seconds: 14,
            text: 'Money is deposited straight into your bank or post office savings account without deductions.',
            nativeText: 'ಯಾವುದೇ ಕಡಿತವಿಲ್ಲದೆ ಹಣವು ನೇರವಾಗಿ ನಿಮ್ಮ ಉಳಿತಾಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ತಲುಪುತ್ತದೆ.',
          },
          {
            seconds: 22,
            text: 'Your application is tracked under the Sakala Guarantee of Services Act to prevent bureaucratic delays.',
            nativeText: 'ಸಕಾಲ ಕಾಯ್ದೆಯ ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಅರ್ಜಿಯ ಪ್ರಗತಿಯನ್ನು ಸದಾ ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು.',
          },
        ],
      },
      {
        title: 'Jeevan Pramaan: Digital Life Certificate from Home',
        categoryId: catMap['pensions-senior-care'],
        language: 'en',
        difficulty: 'intermediate',
        estimatedMinutes: 3,
        explanationText:
          'Previously, pensioners had to physically stand in long lines at banks or treasury offices every November to submit a life certificate. With the Jeevan Pramaan biometric system, seniors can generate a Digital Life Certificate right from home using a smartphone camera with the Aadhaar FaceRD authentication app. The certificate is automatically transmitted to your pension disbursing agency in real time.',
        nativeExplanationText:
          'ಹಿಂದೆ ಪಿಂಚಣಿದಾರರು ಪ್ರತಿ ನವೆಂಬರ್‌ನಲ್ಲಿ ಜೀವಿತ ಪ್ರಮಾಣಪತ್ರ ಸಲ್ಲಿಸಲು ಬ್ಯಾಂಕುಗಳಲ್ಲಿ ಸರದಿಯಲ್ಲಿ ನಿಲ್ಲಬೇಕಿತ್ತು. ಈಗ ಜೀವನ್ ಪ್ರಮಾಣ್ ಆ್ಯಪ್ ಮತ್ತು ಆಧಾರ್ ಫೇಸ್ ರೆಕಗ್ನಿಷನ್ ಮೂಲಕ ಮನೆಯಲ್ಲೇ ಕುಳಿತು ಸ್ಮಾರ್ಟ್‌ಫೋನ್‌ನಲ್ಲಿ ಮುಖ ದೃಢೀಕರಣ ಮಾಡಿ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ ಸಲ್ಲಿಸಬಹುದು.',
        keyPoints: [
          'No need to visit bank or treasury office physically.',
          'Uses Aadhaar Face Authentication App on any Android smartphone.',
          'Requires: Pensioner PPO number, Pension Account Number, and Aadhaar.',
          'Generates unique Pramaan-ID confirmation instantly via SMS.',
        ],
        officialSourceUrl: 'https://jeevanpramaan.gov.in',
        officialDepartment: 'Ministry of Electronics & IT (MeitY)',
        lastVerifiedDate: new Date('2026-01-20'),
        status: 'published',
        viewsCount: 15,
        completionCount: 4,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'Learn how to submit your Jeevan Pramaan life certificate using your smartphone camera.',
            nativeText: 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಜೀವನ್ ಪ್ರಮಾಣ್ ಸಲ್ಲಿಸುವ ವಿಧಾನವನ್ನು ಕಲಿಯಿರಿ.',
          },
          {
            seconds: 7,
            text: 'Download the Jeevan Pramaan app and Aadhaar Face RD tool from the official app store.',
            nativeText: 'ಅಧಿಕೃತ ಆ್ಯಪ್ ಸ್ಟೋರ್‌ನಿಂದ ಜೀವನ್ ಪ್ರಮಾಣ್ ಮತ್ತು ಆಧಾರ್ ಫೇಸ್ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
          },
          {
            seconds: 16,
            text: 'Look directly into the front camera in good lighting and blink your eyes to verify your identity.',
            nativeText: 'ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಮುಂದೆ ನಿಂತು ಕಣ್ಣು ಮಿಟುಕಿಸಿ ನಿಮ್ಮ ಗುರುತನ್ನು ದೃಢೀಕರಿಸಿ.',
          },
        ],
      },
      {
        title: 'Applying for Income & Caste Certificate on Seva Sindhu',
        categoryId: catMap['government-certificates'],
        language: 'en',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        explanationText:
          'Income and caste certificates are mandatory for educational scholarships, college admissions, fee concessions, and government welfare programs. In Karnataka, certificates are issued digitally with a unique 15-digit RD reference number and digitally signed by the Revenue Department. They are valid for five years and can be downloaded anytime as an official PDF.',
        nativeExplanationText:
          'ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಕಾಲೇಜು ಪ್ರವೇಶ ಮತ್ತು ಸರ್ಕಾರಿ ಸವಲತ್ತುಗಳಿಗೆ ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅನಿವಾರ್ಯವಾಗಿದೆ. ಕರ್ನಾಟಕದಲ್ಲಿ 15 ಅಂಕಿಯ ಆರ್‌ಡಿ (RD) ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಡಿಜಿಟಲ್ ಸಹಿ ಹೊಂದಿದ ಪ್ರಮಾಣಪತ್ರ ನೀಡಲಾಗುತ್ತದೆ. ಇದು 5 ವರ್ಷಗಳ ಕಾಲ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ.',
        keyPoints: [
          'Unique 15-digit RD Number for instant digital verification.',
          'Validity: 5 years from date of issue.',
          'Required for school/college scholarship applications and fee waivers.',
          'Track status with GSC number received on SMS.',
        ],
        officialSourceUrl: 'https://sevasindhu.karnataka.gov.in',
        officialDepartment: 'Revenue Department (Nadakacheri / Seva Sindhu)',
        lastVerifiedDate: new Date('2026-03-05'),
        status: 'published',
        viewsCount: 31,
        completionCount: 12,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'Understand how online caste and income certificates work on Seva Sindhu.',
            nativeText: 'ಸೇವಾ ಸಿಂಧುವಿನಲ್ಲಿ ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಹೇಗೆ ಪಡೆಯುವುದು ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
          },
          {
            seconds: 7,
            text: 'Each issued certificate contains a QR code and an RD number that any college can verify online.',
            nativeText: 'ಪ್ರತಿಯೊಂದು ಪ್ರಮಾಣಪತ್ರದಲ್ಲೂ ಕ್ಯೂಆರ್ ಕೋಡ್ ಮತ್ತು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಬಹುದಾದ ಆರ್‌ಡಿ ಸಂಖ್ಯೆ ಇರುತ್ತದೆ.',
          },
        ],
      },
      {
        title: 'Gruha Jyothi: Getting Up to 200 Units Free Electricity',
        categoryId: catMap['electricity-utilities'],
        language: 'en',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        explanationText:
          'Under the Gruha Jyothi scheme, residential households in Karnataka receive free electricity up to their sanctioned monthly entitlement (capped at 200 units). Tenants and homeowners alike can apply. All that is required is linking your electricity Account ID (printed on your monthly electricity bill) with your Aadhaar number on Seva Sindhu.',
        nativeExplanationText:
          'ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆಯಡಿ ಕರ್ನಾಟಕದ ಮನೆಗಳಿಗೆ ತಿಂಗಳಿಗೆ ಗರಿಷ್ಠ 200 ಯೂನಿಟ್‌ಗಳವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್ ನೀಡಲಾಗುತ್ತದೆ. ಬಾಡಿಗೆದಾರರು ಮತ್ತು ಮನೆ ಮಾಲೀಕರು ಇಬ್ಬರೂ ಅರ್ಹರು. ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್‌ನಲ್ಲಿರುವ ಅಕೌಂಟ್ ಐಡಿಯನ್ನು ಆಧಾರ್ ಸಂಖ್ಯೆಗೆ ಜೋಡಿಸಿದರೆ ಸಾಕು.',
        keyPoints: [
          'Covers all domestic meters up to 200 units monthly consumption.',
          'Both owners and tenant households are eligible.',
          'Requires: Electricity bill Account ID (10 digits) + Aadhaar card.',
          'Zero bill arrives automatically once approved.',
        ],
        officialSourceUrl: 'https://sevasindhuservices.karnataka.gov.in',
        officialDepartment: 'Energy Department (BESCOM / HESCOM / MESCOM)',
        lastVerifiedDate: new Date('2026-02-28'),
        status: 'published',
        viewsCount: 42,
        completionCount: 15,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'How to register for the Gruha Jyothi zero electricity bill benefit.',
            nativeText: 'ಗೃಹ ಜ್ಯೋತಿ ಶೂನ್ಯ ವಿದ್ಯುತ್ ಬಿಲ್ ಸೌಲಭ್ಯಕ್ಕೆ ನೋಂದಾಯಿಸುವ ಬಗೆ.',
          },
          {
            seconds: 6,
            text: 'Have your BESCOM or electricity bill handy to find your 10-digit Account ID.',
            nativeText: 'ನಿಮ್ಮ 10 ಅಂಕಿಯ ಅಕೌಂಟ್ ಐಡಿ ತಿಳಿಯಲು ವಿದ್ಯುತ್ ಬಿಲ್ ಹತ್ತಿರ ಇಟ್ಟುಕೊಳ್ಳಿ.',
          },
        ],
      },
      {
        title: 'Property Tax Payment & e-Khata Verification (BBMP / Municipal)',
        categoryId: catMap['property-tax'],
        language: 'en',
        difficulty: 'beginner',
        estimatedMinutes: 3,
        explanationText:
          'Every property owner in urban Karnataka must pay annual municipal property tax under the Self-Assessment Scheme (SAS). Using your unique 10-digit Property Identification Number (PID), you can verify your electronic Khata (e-Khata), compute your property cess, and pay online with zero convenience fee. Paying in the first two months of the financial year grants an automatic 5% government rebate on total property tax.',
        nativeExplanationText:
          'ಕರ್ನಾಟಕದ ನಗರ ಪ್ರದೇಶದ ಪ್ರತಿಯೊಬ್ಬ ಆಸ್ತಿ ಮಾಲೀಕರು ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ ಪದ್ಧತಿಯಡಿ ವಾರ್ಷಿಕ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿಸಬೇಕು. ನಿಮ್ಮ 10 ಅಂಕಿಯ ಪಿಐಡಿ (PID) ಸಂಖ್ಯೆ ಬಳಸಿ ಇ-ಖಾತಾ ಪರಿಶೀಲಿಸಬಹುದು ಮತ್ತು ತೆರಿಗೆ ಪಾವತಿಸಬಹುದು. ಆರ್ಥಿಕ ವರ್ಷದ ಮೊದಲ ಎರಡು ತಿಂಗಳಲ್ಲಿ ಪಾವತಿಸಿದರೆ ಶೇಕಡಾ 5 ರಷ್ಟು ರಿಯಾಯಿತಿ ದೊರೆಯುತ್ತದೆ.',
        keyPoints: [
          'Unique 10-digit PID (Property Identification) or SAS application number.',
          '5% early payment rebate when paid in April or May.',
          'Verify e-Khata (A-Khata / B-Register) status before purchasing or paying.',
          'Instant downloadable digital receipt with municipal watermark.',
        ],
        officialSourceUrl: 'https://bbmptax.karnataka.gov.in',
        officialDepartment: 'Bruhat Bengaluru Mahanagara Palike (BBMP) / Municipal Administration',
        lastVerifiedDate: new Date('2026-03-08'),
        status: 'published',
        viewsCount: 20,
        completionCount: 7,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'How to pay municipal property tax and verify your e-Khata online.',
            nativeText: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿಸುವುದು ಮತ್ತು ಇ-ಖಾತಾ ಪರಿಶೀಲಿಸುವ ವಿಧಾನ.',
          },
          {
            seconds: 7,
            text: 'Keep your previous year tax receipt handy to find your 10-digit PID number.',
            nativeText: 'ನಿಮ್ಮ 10 ಅಂಕಿಯ ಪಿಐಡಿ ಸಂಖ್ಯೆ ತಿಳಿಯಲು ಹಿಂದಿನ ವರ್ಷದ ತೆರಿಗೆ ರಸೀದಿ ಇಟ್ಟುಕೊಳ್ಳಿ.',
          },
        ],
      },
      {
        title: 'Filing Public Grievances on Janaspandana & Sakala',
        categoryId: catMap['grievances-sakala'],
        language: 'en',
        difficulty: 'intermediate',
        estimatedMinutes: 4,
        explanationText:
          'When government services face unexplained delays, citizens have the legal right under the Sakala Act 2011 to demand time-bound delivery. Janaspandana is the integrated online grievance redressal platform. Once a complaint is filed, you receive a tracking token by SMS, and the assigned officer must resolve the issue or provide written reasons within 21 days.',
        nativeExplanationText:
          'ಸರ್ಕಾರಿ ಸೇವೆಗಳಲ್ಲಿ ವಿಳಂಬವಾದಾಗ ಸಕಾಲ ಕಾಯ್ದೆ 2011 ರ ಅಡಿಯಲ್ಲಿ ಸಕಾಲಿಕ ಸೇವೆ ಪಡೆಯುವುದು ನಾಗರಿಕರ ಹಕ್ಕು. ಜನಸ್ಪಂದನ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿದಾಗ ಟೋಕನ್ ಸಂಖ್ಯೆ ದೊರೆಯುತ್ತದೆ ಮತ್ತು ಸಂಬಂಧಿತ ಅಧಿಕಾರಿಯು 21 ದಿನಗಳಲ್ಲಿ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಬೇಕು.',
        keyPoints: [
          'Enforces legal accountability under Karnataka Sakala Services Act 2011.',
          '21-day standard resolution deadline for civic grievances.',
          'SMS token allows tracking progress 24/7 without visiting offices.',
          'Right to escalate to First Appellate Authority if unsatisfied.',
        ],
        officialSourceUrl: 'https://janaspandana.karnataka.gov.in',
        officialDepartment: 'DPAR (Administrative Reforms), Govt of Karnataka',
        lastVerifiedDate: new Date('2026-03-10'),
        status: 'published',
        viewsCount: 18,
        completionCount: 6,
        transcriptTimed: [
          {
            seconds: 0,
            text: 'Empower yourself using the Janaspandana public grievance and Sakala portal.',
            nativeText: 'ಜನಸ್ಪಂದನ ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ಮತ್ತು ಸಕಾಲ ಪೋರ್ಟಲ್ ಬಳಸುವ ವಿಧಾನ ತಿಳಿಯಿರಿ.',
          },
          {
            seconds: 7,
            text: 'Every complaint receives a tracking token and guaranteed response timeline by law.',
            nativeText: 'ಪ್ರತಿಯೊಂದು ದೂರಿಗೂ ಟ್ರ್ಯಾಕಿಂಗ್ ಟೋಕನ್ ಮತ್ತು ಕಾನೂನುಬದ್ಧ ಗಡುವು ಇರುತ್ತದೆ.',
          },
        ],
      },
    ]);

    console.log('[Seed] Seeding completed successfully with 6 categories and 6 comprehensive lessons!');
  } catch (error) {
    console.error('[Seed] Error seeding data:', error.message);
  }
};
