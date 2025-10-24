import { ShieldCheck, Sparkles, ThumbsUp, Wand2 } from 'lucide-react';
import type { ComponentType } from 'react';
import { Badge } from '../ui/badge';

export type BadgeVariant = 'KidFriendly' | 'VerifiedID' | 'TopRated' | 'Hygiene';

const variantConfig: Record<BadgeVariant, { label: string; icon: ComponentType<{ className?: string }>; variant: 'primary' | 'success' | 'neutral' }> = {
  KidFriendly: { label: 'Kid-Friendly certifiée', icon: Sparkles, variant: 'primary' },
  VerifiedID: { label: 'Identité vérifiée', icon: ShieldCheck, variant: 'neutral' },
  TopRated: { label: '98% des parents recommandent', icon: ThumbsUp, variant: 'success' },
  Hygiene: { label: 'Hygiène rigoureuse', icon: Wand2, variant: 'neutral' },
};

export type BadgesProps = {
  variants: BadgeVariant[];
};

export const Badges = ({ variants }: BadgesProps) => (
  <div className="flex flex-wrap gap-2" aria-label="Badges de confiance">
    {variants.map((variant) => {
      const config = variantConfig[variant];
      const Icon = config.icon;
      return (
        <Badge key={variant} variant={config.variant} className="gap-2">
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span>{config.label}</span>
        </Badge>
      );
    })}
  </div>
);
