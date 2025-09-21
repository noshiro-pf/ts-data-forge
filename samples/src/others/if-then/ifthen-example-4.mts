// Sample code extracted from src/others/if-then.mts (ifThen)
// Contract validation - "if premium then features enabled"

import { ifThen } from 'ts-data-forge';

interface Subscription {
  isPremium: boolean;
  features: {
    advancedAnalytics: boolean;
    unlimitedStorage: boolean;
    prioritySupport: boolean;
  };
}

function validateSubscription(sub: Subscription): boolean {
  // If premium, then all premium features must be enabled
  return ifThen(
    sub.isPremium,
    sub.features.advancedAnalytics &&
      sub.features.unlimitedStorage &&
      sub.features.prioritySupport,
  );
}
