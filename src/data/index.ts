import { FontAwesome } from '@expo/vector-icons';
import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  fontSize?: number;
  links?: {
    icon: keyof typeof FontAwesome.glyphMap;
    url: string;
  }[];
}

export const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../../assets/animations/Lottie1.json'),
    text: 'Welcome to this onboarding demo!',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../../assets/animations/Lottie2.json'),
    text: 'do you want to know more about me?',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../../assets/animations/Lottie3.json'),
    text: 'I am a software developer, and I love to learn new things!',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
  {
    id: 4,
    animation: require('../../assets/animations/Lottie4.json'),
    text: 'Find me on LinkedIn, GitHub, or my website!',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
    fontSize: 34,
    links: [
      {
        icon: 'linkedin-square',
        url: 'https://www.linkedin.com/in/guillermo-puente-66125b54/'
      },
      {
        icon: 'github-square',
        url: 'https://github.com/gpuente',
      },
      {
        icon: 'globe',
        url: 'https://gpuente.me',
      },
    ],
  },
];
