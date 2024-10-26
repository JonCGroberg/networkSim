export interface UserProfile {
    error: boolean;
    response: {
        first_name: string;
        last_name: string;
        full_name: string;
        gender: string | null;
        job_title: string;
        linkedin: string;
        summary: string;
        premium: boolean;
        skills: string;
        work_experience: WorkExperience[];
        education: Education[];
        languages: Language[];
        connections_count: number;
        followers_count: number;
        current_job_year: number;
        current_job_month: number;
        entity_urn: string;
        picture: string;
        email: Email;
        company: Company;
        location: Location;
    };
}

interface WorkExperience {
    company: CompanyDetails;
    date: DateRange;
    profile_positions: ProfilePosition[];
}

interface CompanyDetails {
    id: number | null;
    name: string;
    logo: string;
    url: string;
    employees: string;
}

interface DateRange {
    start: PartialDate;
    end: PartialDate | null;
}

interface PartialDate {
    month: number | null;
    day: number | null;
    year: number | null;
}

interface ProfilePosition {
    location: string | null;
    date: DateRange;
    company: string;
    description: string;
    title: string;
    employment_type: string;
}

interface Education {
    date: DateRange;
    school: {
        name: string;
        logo: string | null;
        url: string | null;
    };
    degree_name: string | null;
    field_of_study: string[];
    grade: string | null;
}

interface Language {
    name: string;
    proficiency: string;
}

interface Email {
    email: string;
    email_anon_id: string;
    email_status: string;
    email_type: string;
}

interface Company {
    name: string;
    is_catch_all: boolean | null;
    size: string | null;
    logo: string;
    linkedin: string;
    website: string;
    domain: string;
    common_email_pattern: string | null;
    industry: string;
    founded_in: number | null;
    description: string;
    total_emails: number;
    location: CompanyLocation;
}

interface CompanyLocation {
    country: string | null;
    country_code: string | null;
    state: string | null;
    city: string | null;
    timezone: string | null;
    timezone_offset: string | null;
    postal_code: string | null;
    address: string | null;
}

interface Location {
    country: string;
    country_code: string | null;
    state: string | null;
    city: string | null;
    timezone: string | null;
    timezone_offset: string | null;
    postal_code: string | null;
    raw: string;
}


// List of fake users
export const fakeUsers: UserProfile[] = [
    { 'error': false, 'response': { 'first_name': 'Elan', 'last_name': 'Grossman', 'full_name': 'Elan Grossman', 'gender': null, 'job_title': 'Applied AI - Senior Consultant | Research and Innovation', 'linkedin': 'https://www.linkedin.com/in/elan-grossman', 'summary': 'Data Scientist with a demonstrated history of working in the health care, cybersecurity, and retail industries', 'premium': false, 'skills': 'Causal Analysis, NLU, Large Language Models (LLM), Generative Adversarial Networks (GANs), Programming, Physics, Optics, Robotics, Java, Python, Labview, Matlab, C, SQL, Circuit Design, Assistant Teaching, Japanese, Research, Linux, JavaScript, MySQL, Simulations, Data Analysis, EHR, Machine Learning', 'work_experience': [{ 'company': { 'id': 1038, 'name': 'Deloitte', 'logo': 'https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_400_400/company-logo_400_400/0/1662120928214/deloitte_logo?e=1738195200&v=beta&t=2wVgayyer0Dt0oM0eIqB8LqnwmeujHwSeu2KXxeDw4Y', 'url': 'https://www.linkedin.com/company/deloitte/', 'employees': '10001-0' }, 'date': { 'start': { 'month': 5, 'day': null, 'year': 2022 }, 'end': null }, 'profile_positions': [{ 'location': 'OO', 'date': { 'start': { 'month': 5, 'day': null, 'year': 2022 }, 'end': null }, 'company': 'Deloitte', 'description': 'I help clients solve problems using AI\n- NLU intent Detection\n- Causal ML\n- Generative AI - GANs and LLMs\n- Obligatory PowerPoint slides', 'title': 'Applied AI - Senior Consultant', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 1534, 'name': 'The Home Depot', 'logo': 'https://media.licdn.com/dms/image/v2/C4E0BAQHzR2llYqUBtg/company-logo_400_400/company-logo_400_400/0/1630656428961/the_home_depot_logo?e=1738195200&v=beta&t=IMPbASrgeIFUEnWUYZP3CV1jDpYZB4jQnDTnUmVcqUY', 'url': 'https://www.linkedin.com/company/the-home-depot/', 'employees': '10001-0' }, 'date': { 'start': { 'month': 1, 'day': null, 'year': 2020 }, 'end': { 'month': 5, 'day': null, 'year': 2022 } }, 'profile_positions': [{ 'location': 'Atlanta, Georgia, US', 'date': { 'start': { 'month': 1, 'day': null, 'year': 2020 }, 'end': { 'month': 5, 'day': null, 'year': 2022 } }, 'company': 'The Home Depot', 'description': '- Perform Applied Research and Development\n- Work with stakeholders across the business to determine new revenue streams or solve existing - Inefficiencies through modern advances in technology\n- Quickly prototype new technology for retail such as AR, VR, AI/ML, and Robotics\n- Use expertise in Machine Learning and Software Development to architect novel applications from the ground up\n- NLP, Computer Vision, Linear Optimization, Game Development, Time Series Predictions\nMentor and manage developers and interns to complete MVPs and research\n- Organize and archive results from research to hand off to any interested parties\n- Work closely with UX and product management to conduct research and interviews for new products', 'title': 'Applied Research and Innovation - Staff Software Engineer - OrangeWorks Innovation Lab', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 14840050, 'name': 'Truist', 'logo': 'https://media.licdn.com/dms/image/v2/C560BAQF4TzQO33psog/company-logo_400_400/company-logo_400_400/0/1656680740676/truistfinancialcorporation_logo?e=1738195200&v=beta&t=MbcE0WRaKanj-f6rQj4wERZ3KZnoUUbaZPvxvUeNHGo', 'url': 'https://www.linkedin.com/company/truistfinancialcorporation/', 'employees': '10001-0' }, 'date': { 'start': { 'month': 8, 'day': null, 'year': 2019 }, 'end': { 'month': 1, 'day': null, 'year': 2020 } }, 'profile_positions': [{ 'location': 'Charlotte, North Carolina, US', 'date': { 'start': { 'month': 8, 'day': null, 'year': 2019 }, 'end': { 'month': 1, 'day': null, 'year': 2020 } }, 'company': 'Truist', 'description': 'Machine Learning Engineer for Cyber Incident Response Team', 'title': 'Cyber Security Data Scientist - Threat Hunting', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 1534, 'name': 'The Home Depot', 'logo': 'https://media.licdn.com/dms/image/v2/C4E0BAQHzR2llYqUBtg/company-logo_400_400/company-logo_400_400/0/1630656428961/the_home_depot_logo?e=1738195200&v=beta&t=IMPbASrgeIFUEnWUYZP3CV1jDpYZB4jQnDTnUmVcqUY', 'url': 'https://www.linkedin.com/company/the-home-depot/', 'employees': '10001-0' }, 'date': { 'start': { 'month': 3, 'day': null, 'year': 2018 }, 'end': { 'month': 8, 'day': null, 'year': 2019 } }, 'profile_positions': [{ 'location': 'Atlanta, Georgia, US', 'date': { 'start': { 'month': 3, 'day': null, 'year': 2018 }, 'end': { 'month': 8, 'day': null, 'year': 2019 } }, 'company': 'The Home Depot', 'description': '- Use Machine Learning to classify text documents\n - Developed classification algorithm by analyzing text and images using NLP\n - Built web application in Python with API to process any document\n - Engineered CI/CD pipelines to automate code deployments to production\n - Built front end and back end for supporting application in Java, Python and React', 'title': 'Machine Learning Engineer', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 36870, 'name': 'The Proven Method', 'logo': 'https://media.licdn.com/dms/image/v2/D4E0BAQFP-koh2oL6uQ/company-logo_400_400/company-logo_400_400/0/1728402430921/the_proven_method_logo?e=1738195200&v=beta&t=M7sg5Z1bUVt5bU-hHQuCftSxHUEVROHp-1SDft1ekEk', 'url': 'https://www.linkedin.com/company/the-proven-method/', 'employees': '51-200' }, 'date': { 'start': { 'month': 3, 'day': null, 'year': 2018 }, 'end': { 'month': 9, 'day': null, 'year': 2018 } }, 'profile_positions': [{ 'location': 'Atlanta, Georgia, US', 'date': { 'start': { 'month': 3, 'day': null, 'year': 2018 }, 'end': { 'month': 9, 'day': null, 'year': 2018 } }, 'company': 'The Proven Method', 'description': 'Contracting at The Home Depot\nBuilding quality software for people that build software using AI', 'title': 'Machine Learning Engineer', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 1570330, 'name': 'Philips Wellcentive', 'logo': 'https://media.licdn.com/dms/image/v2/C510BAQEkjP1BelkEew/company-logo_400_400/company-logo_400_400/0/1631302254680?e=1738195200&v=beta&t=057-dno2mk9GhwZ4Vq-4WStJJTfHtw11KEdLa6RBy0A', 'url': 'https://www.linkedin.com/company/wellcentive/', 'employees': '51-200' }, 'date': { 'start': { 'month': 6, 'day': null, 'year': 2016 }, 'end': { 'month': 3, 'day': null, 'year': 2018 } }, 'profile_positions': [{ 'location': 'Alpharetta, GA, US', 'date': { 'start': { 'month': 6, 'day': null, 'year': 2016 }, 'end': { 'month': 3, 'day': null, 'year': 2018 } }, 'company': 'Philips Wellcentive', 'description': '•\tAutomate tasks and reports for technical support\n•\tTrack SLAs of Services team\n•\tComplete urgent and escalated technical support tickets\n•\tDiagnose Data pipeline issues and manipulate data\n•\tIdentify and fix duplicate data by designing algorithms\n•\tPerform exploratory research for data science team\n\nTechnologies used: Python (Flask, sklearn,pandas), SQL, bash, javascript, REST APIs, Angular', 'title': 'Technical Analyst', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 1570330, 'name': 'Philips Wellcentive', 'logo': 'https://media.licdn.com/dms/image/v2/C510BAQEkjP1BelkEew/company-logo_400_400/company-logo_400_400/0/1631302254680?e=1738195200&v=beta&t=057-dno2mk9GhwZ4Vq-4WStJJTfHtw11KEdLa6RBy0A', 'url': 'https://www.linkedin.com/company/wellcentive/', 'employees': '51-200' }, 'date': { 'start': { 'month': 4, 'day': null, 'year': 2015 }, 'end': { 'month': 6, 'day': null, 'year': 2016 } }, 'profile_positions': [{ 'location': 'Alpharetta, GA, US', 'date': { 'start': { 'month': 4, 'day': null, 'year': 2015 }, 'end': { 'month': 6, 'day': null, 'year': 2016 } }, 'company': 'Philips Wellcentive', 'description': '•\tWorked with clients to improve quality metrics by analyzing healthcare data to discover gaps in patient care\n•\tUtilized SQL to create reports showing abnormalities in received data and to quantify missing data\n•\tCoordinated weekly meetings with clients to develop a strategic action plan for improving data quality and consequently, metric scores\n•\tAutomated reports, alerts, and tasks using python and bash scripts\n•      Monitored data pipelines to and ETL engine to ensure data integrity\n\nTools used: SQL, Java, Javascript, python, R, pentaho, bash/unix, JIRA, Zendesk\nData Formats: HL7, CCD, CCDA, X12, NCPDP, delimited, CCLF, XML', 'title': 'Data Quality Analyst', 'employment_type': 'Full-time' }] }, { 'company': { 'id': 1570330, 'name': 'Philips Wellcentive', 'logo': 'https://media.licdn.com/dms/image/v2/C510BAQEkjP1BelkEew/company-logo_400_400/company-logo_400_400/0/1631302254680?e=1738195200&v=beta&t=057-dno2mk9GhwZ4Vq-4WStJJTfHtw11KEdLa6RBy0A', 'url': 'https://www.linkedin.com/company/wellcentive/', 'employees': '51-200' }, 'date': { 'start': { 'month': 8, 'day': null, 'year': 2013 }, 'end': { 'month': 4, 'day': null, 'year': 2015 } }, 'profile_positions': [{ 'location': 'Alpharetta, GA, US', 'date': { 'start': { 'month': 8, 'day': null, 'year': 2013 }, 'end': { 'month': 4, 'day': null, 'year': 2015 } }, 'company': 'Philips Wellcentive', 'description': '- Develop code and algorithms to Aggregate, Extract, and Normalize data from disparate Electronic Medical Records (HL7, CCD, CCDA, 837, CCR)', 'title': 'Interface Engineer', 'employment_type': 'Full-time' }] }, { 'company': { 'id': null, 'name': 'NTT Basic Research Laboratories', 'logo': '', 'url': '', 'employees': '' }, 'date': { 'start': { 'month': 1, 'day': null, 'year': 2012 }, 'end': { 'month': 8, 'day': null, 'year': 2012 } }, 'profile_positions': [{ 'location': null, 'date': { 'start': { 'month': 1, 'day': null, 'year': 2012 }, 'end': { 'month': 8, 'day': null, 'year': 2012 } }, 'company': 'NTT Basic Research Laboratories', 'description': 'Design, measurement, and analysis of photonic crystal waveguides\nRan computer simulations (FDTD) and examined physical samples using optical measuring devices', 'title': 'Photonic Nanostructres Research Group - Research Intern', 'employment_type': 'Full-time' }] }, { 'company': { 'id': null, 'name': 'Soft Condensed Matter Laboratory', 'logo': '', 'url': '', 'employees': '' }, 'date': { 'start': { 'month': 5, 'day': null, 'year': 2011 }, 'end': { 'month': 8, 'day': null, 'year': 2011 } }, 'profile_positions': [{ 'location': null, 'date': { 'start': { 'month': 5, 'day': null, 'year': 2011 }, 'end': { 'month': 8, 'day': null, 'year': 2011 } }, 'company': 'Soft Condensed Matter Laboratory', 'description': 'Study of drag forces in viscoelastic media\nBuilt measuring device involving strain gauges and designed relevant circuit', 'title': 'Undergraduate Research Assistant', 'employment_type': 'Full-time' }] }], 'education': [{ 'date': { 'start': { 'month': null, 'day': null, 'year': 2021 }, 'end': { 'month': null, 'day': null, 'year': 2024 } }, 'school': { 'name': 'Georgia Institute of Technology', 'logo': null, 'url': null }, 'degree_name': null, 'field_of_study': ['Master of Science - MS', ' Computer Science'], 'grade': null }, { 'date': { 'start': { 'month': null, 'day': null, 'year': 2008 }, 'end': { 'month': null, 'day': null, 'year': 2013 } }, 'school': { 'name': 'Georgia Institute of Technology', 'logo': null, 'url': null }, 'degree_name': null, 'field_of_study': ["Bachelor's degree", ' Physics'], 'grade': null }], 'languages': [{ 'name': 'English', 'proficiency': '' }, { 'name': 'Japanese', 'proficiency': '' }], 'connections_count': 1153, 'followers_count': 1160, 'current_job_year': 2022, 'current_job_month': 5, 'entity_urn': 'ACoAAA3VUncBey8X5MRzoUvAb8zHqjzHqvJ3SZ8', 'picture': 'https://assets-prospeo.s3.us-east-2.amazonaws.com/lead_RZ8G4FHP0EQMP8GX7F00.jpg', 'email': { 'email': 'egrossman@deloitte.com', 'email_anon_id': 'n7Iclyqr4QuD', 'email_status': 'VALID', 'email_type': 'professional' }, 'company': { 'name': 'deloitte', 'is_catch_all': null, 'size': null, 'logo': 'https://assets-prospeo.s3.us-east-2.amazonaws.com/company_DE0NGQW4OJDM1JENJGRK.jpg', 'linkedin': 'https://www.linkedin.com/company/deloitte/', 'website': 'http://www.deloitte.com/', 'domain': 'deloitte.com', 'common_email_pattern': null, 'industry': 'Business Consulting and Services', 'founded_in': null, 'description': 'Deloitte drives progress. Our firms around the world help clients become leaders wherever they choose to compete. Deloitte invests in outstanding people of diverse talents and backgrounds and empowers them to achieve more than they could elsewhere. Our work combines advice with action and integrity. We believe that when our clients and society are stronger, so are we. \n\nDeloitte refers to one or more of Deloitte Touche Tohmatsu Limited (“DTTL”), its global network of member firms, and their related entities. DTTL (also referred to as “Deloitte Global”) and each of its member firms are legally separate and independent entities. DTTL does not provide services to clients. Please see www.deloitte.com/about to learn more.\n\nThe content on this page contains general information only, and null of Deloitte Touche Tohmatsu Limited, its member firms, or their related entities (collectively the “Deloitte Network”) is, by means of this publication, rendering professional advice or services. Before making any decision or taking any action that may affect your finances or your business, you should consult a qualified professional adviser. No entity in the Deloitte Network shall be responsible for any loss whatsoever sustained by any person who relies on content from this page.', 'total_emails': 1000, 'location': { 'country': null, 'country_code': null, 'state': null, 'city': null, 'timezone': null, 'timezone_offset': null, 'postal_code': null, 'address': null } }, 'location': { 'country': 'Georgia United States;', 'country_code': null, 'state': 'Atlanta', 'city': null, 'timezone': null, 'timezone_offset': null, 'postal_code': null, 'raw': 'Atlanta, Georgia United States;' } } }
];

export function findUserProfileByName(fullName: string): UserProfile | undefined {
    return fakeUsers.find(user => user.response.full_name === fullName);
}
