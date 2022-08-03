import SubscriptionService from "@/services/subscription.service";

const initialstate = false;

export const SubscribeModule = {
  namespaced: true,
  state: initialstate,
  actions: {
    checkSubscription(id) {
      return SubscriptionService.checkSubscription(id).then((data) => {
        return Promise.resolve(data);
      });
    },
  },
};
