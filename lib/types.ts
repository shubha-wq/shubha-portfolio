export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  industry: string;
  duration: string;
  image: ProjectImage;
  context: string;
  problem: string;
  process: string;
  outcome: string;
  enabled: boolean;
  carouselHeading?: string;
  carouselBody?: string;
  pullQuote?: string;
};
