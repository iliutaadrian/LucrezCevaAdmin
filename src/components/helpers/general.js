export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const currentUser = store.state.user;

        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

        if(requiresAuth && currentUser==null) {
            next('/');
        }
        else
            if(!requiresAuth && currentUser!= null){
                next('/users/list');
            }
            else {
                next();
            }
    });
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");
    if(!userStr) {
        return null;
    }
    return JSON.parse(userStr);
}