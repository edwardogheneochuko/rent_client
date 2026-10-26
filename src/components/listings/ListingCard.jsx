// A listing summary card. The TOTAL move-in cost is the biggest number on
// the card, because that's what a tenant actually has to pay up front.

import { Link } from 'react-router';

import LazyImage from '../ui/LazyImage';
import Rating from '../ui/Rating';
import { CheckCircleIcon, MapPinIcon } from '../icons';
import { formatNaira, formatNairaShort, stateLabel, typeLabel } from '../../utils/format';

export default function ListingCard({ listing }) {
  const property = listing.propertyId; // populated by the API
  const agent = listing.agentId;
  const fees = listing.totalMoveInCost - listing.rent;
  const title = `${typeLabel(property.type)} in ${property.area}`;

  return (
    <article className="card group overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/listings/${listing._id}`} className="block focus-visible:-outline-offset-2">
        <div className="relative">
          {/* Wider, shorter image on phones so more listings fit on screen */}
          <LazyImage src={property.photos?.[0]} alt={title} width={600} className="aspect-video w-full sm:aspect-4/3" />
          {listing.status === 'taken' && (
            <span className="badge absolute left-3 top-3 bg-gray-900/80 text-white">Taken</span>
          )}
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-700">{title}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {property.address}, {stateLabel(property.state)}
              </span>
            </p>
          </div>

          {/* The headline number */}
          <div className="rounded-lg bg-brand-50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Total to move in</p>
            <p className="text-xl font-bold text-gray-900">{formatNaira(listing.totalMoveInCost)}</p>
            <p className="text-xs text-gray-600">
              Rent {formatNaira(listing.rent)}/yr
              {fees > 0 && <> + {formatNairaShort(fees)} fees</>}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            {agent ? (
              <span className="flex min-w-0 items-center gap-1 text-gray-700">
                <span className="truncate">{agent.name}</span>
                {agent.verified && (
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-brand-600" aria-label="Verified agent" />
                )}
              </span>
            ) : (
              <span className="text-gray-500">No agent: direct from landlord</span>
            )}
            <Rating value={property.averageRating} count={property.reviewCount} className="shrink-0" />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Grey placeholder shown while listings load */
export function ListingCardSkeleton() {
  return (
    <div className="card animate-pulse overflow-hidden" aria-hidden="true">
      <div className="aspect-video bg-gray-100 sm:aspect-4/3" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-gray-100" />
        <div className="h-3 w-1/2 rounded bg-gray-100" />
        <div className="h-16 rounded-lg bg-gray-100" />
        <div className="h-3 w-1/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}
