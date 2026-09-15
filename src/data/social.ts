export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  iconName?: string;
  isExternal: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    label: 'github.com/wijdanelbakhouchi',
    url: 'https://github.com/wijdanelbakhouchi',
    isExternal: true,
  },
  {
    platform: 'LinkedIn',
    label: 'linkedin.com/in/wijdane-elbakhouchi',
    url: 'https://www.linkedin.com/in/wijdane-elbakhouchi/',
    isExternal: true,
  },
  {
    platform: 'Email',
    label: 'wijdane.elbakhouchi24@gmail.com',
    url: 'mailto:wijdane.elbakhouchi24@gmail.com',
    isExternal: false,
  },
];
