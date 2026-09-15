export interface CertificationItem {
  name: string;
  issuer: string;
  platform: string;
  credentialId?: string;
  skills: string[];
  description: string;
}

export const certificationsList: CertificationItem[] = [
  {
    name: 'Machine Learning with Python',
    issuer: 'IBM',
    platform: 'Coursera',
    skills: [
      'Machine Learning Algorithms',
      'Scikit-learn',
      'Regression & Classification',
      'Clustering',
      'Model Evaluation',
    ],
    description:
      'Comprehensive professional specialization covering supervised and unsupervised learning algorithms, mathematical foundations, data preprocessing, and evaluation metrics using Python and Scikit-learn.',
  },
  {
    name: 'REST APIs Development with Java',
    issuer: 'Udemy',
    platform: 'Udemy',
    skills: [
      'RESTful Architecture',
      'Java Enterprise',
      'API Design',
      'HTTP Protocols',
      'JSON Serialization',
    ],
    description:
      'Practical engineering curriculum focusing on designing, building, securing, and testing enterprise RESTful web services in Java.',
  },
];
