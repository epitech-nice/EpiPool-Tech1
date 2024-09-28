import { reactive } from 'vue';

const notifications = reactive({
    component: null,
});

export function useNotification() {
    return {
        show(message, type = 'success') {
            if (notifications.component) {
                notifications.component.showNotification(message, type);
            }
        },
        setNotificationComponent(component) {
            notifications.component = component;
        },
    };
}
