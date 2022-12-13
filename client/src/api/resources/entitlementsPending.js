export default {
  index(filter = {}, page = {}) {
    return {
      endpoint: `/api/v1/pending_entitlements`,
      method: "GET",
      options: {
        params: { filter, page }
      }
    };
  },

  create(entitlement) {
    return {
      endpoint: `/api/v1/pending_entitlements`,
      method: "POST",
      options: {
        body: JSON.stringify({
          type: "pending_entitlements",
          data: entitlement
        })
      }
    };
  },

  show(id) {
    return {
      endpoint: `/api/v1/pending_entitlements/${id}`,
      method: "GET"
    };
  },

  destroy(id) {
    return {
      endpoint: `/api/v1/pending_entitlements/${id}`,
      method: "DELETE"
    };
  }
};
