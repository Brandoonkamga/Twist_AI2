import { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import { CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from '../../i18n';

type BadgeVariant = 'KidFriendly' | 'VerifiedID' | 'TopRated' | 'Hygiene';

const ICONS: Record<BadgeVariant, ReactNode> = {
  KidFriendly: <HeartHandshake className="h-4 w-4" aria-hidden="true" />,
  VerifiedID: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  TopRated: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  Hygiene: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
};

const VARIANT_STYLE: Record<BadgeVariant, string> = {
  KidFriendly: 'bg-success/10 text-success',
  VerifiedID: 'bg-primary/10 text-primary',
  TopRated: 'bg-warning/10 text-warning',
  Hygiene: 'bg-primaryContrast text-white'
};

export const Badges = ({ badges }: { badges: BadgeVariant[] }) => {
  const { t } = useTranslation();
  const labelMap: Record<BadgeVariant, string> = {
    KidFriendly: t('common.labels.kidFriendly'),
    VerifiedID: t('common.labels.verifiedID'),
    TopRated: t('common.labels.topRated'),
    Hygiene: t('common.labels.hygiene')
  };

  const unique = Array.from(new Set(badges));

  return (
    <div className="flex flex-wrap gap-2">
      {unique.map((badge) => (
        <Badge
          key={badge}
          variant="outline"
          className={clsx('gap-1.5 text-xs font-semibold', VARIANT_STYLE[badge])}
          aria-label={labelMap[badge]}
        >
          {ICONS[badge]}
          <span>{labelMap[badge]}</span>
        </Badge>
      ))}
    </div>
  );
};
