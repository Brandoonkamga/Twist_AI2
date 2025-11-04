import { ShieldCheck, Baby, Sparkles, Sprout } from 'lucide-react';
import { Badge } from '../ui/badge';

export type BadgeVariant = 'KidFriendly' | 'VerifiedID' | 'TopRated' | 'Hygiene';

const badgeConfig: Record<BadgeVariant, { label: string; icon: JSX.Element; tone?: 'primary' | 'success' | 'info' }> = {
  KidFriendly: {
    label: 'Kid-Friendly certifiée',
    icon: <Baby className="mr-1 h-4 w-4" aria-hidden />,
    tone: 'success',
  },
  VerifiedID: {
    label: 'Identité vérifiée',
    icon: <ShieldCheck className="mr-1 h-4 w-4" aria-hidden />,
    tone: 'primary',
  },
  TopRated: {
    label: 'Parents recommandent',
    icon: <Sparkles className="mr-1 h-4 w-4" aria-hidden />,
    tone: 'info',
  },
  Hygiene: {
    label: 'Hygiène impeccable',
    icon: <Sprout className="mr-1 h-4 w-4" aria-hidden />,
    tone: 'info',
  },
};

export const TrustBadge = ({ variant }: { variant: BadgeVariant }) => {
  const badge = badgeConfig[variant];
  return (
    <Badge tone={badge.tone} className="gap-1">
      {badge.icon}
      <span>{badge.label}</span>
    </Badge>
  );
};
