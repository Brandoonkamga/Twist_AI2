import { CheckCircle, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useI18n } from '../../state/i18n.context';

type BadgeVariant = 'KidFriendly' | 'VerifiedID' | 'TopRated' | 'Hygiene';

type VariantConfig = {
  label: string;
  icon: JSX.Element;
  className?: string;
};

export const getBadgeConfig = (variant: BadgeVariant, t: (path: string) => string): VariantConfig => {
  switch (variant) {
    case 'KidFriendly':
      return {
        label: t('common.labels.kidFriendly'),
        icon: <HeartHandshake className="h-4 w-4" aria-hidden="true" />,
        className: 'bg-success/10 text-success'
      };
    case 'VerifiedID':
      return {
        label: t('common.labels.verifiedID'),
        icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
        className: 'bg-primary/10 text-primary'
      };
    case 'TopRated':
      return {
        label: 'Top Rated',
        icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
        className: 'bg-warning/10 text-warning'
      };
    case 'Hygiene':
      return {
        label: 'Hygiène renforcée',
        icon: <CheckCircle className="h-4 w-4" aria-hidden="true" />,
        className: 'bg-success/10 text-success'
      };
  }
};

export const Badges = ({ variants }: { variants: BadgeVariant[] }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const config = getBadgeConfig(variant, t);
        return (
          <Badge key={variant} className={config.className} aria-label={config.label}>
            {config.icon}
            {config.label}
          </Badge>
        );
      })}
    </div>
  );
};
