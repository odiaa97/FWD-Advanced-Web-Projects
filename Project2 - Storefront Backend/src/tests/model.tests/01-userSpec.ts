import { Auth } from '../../stores/AuthStore/authenticateStore'
import { User } from '../../models/user'

const authStore = new Auth();
const user: User = { id: 1, username: 'John', email: 'john@example.com', password: 'password', role: "user" };

describe('USER MODEL TEST', () => {

    it('Should register a new user', async () => {
        expect(await authStore.register(user)).toEqual({ id: 1, username: 'John', email: 'john@example.com', role: 'user' });
    });

    it('Should login a new user', async () => {
        const token = await authStore.login("John", "password");
        expect(token).toMatch(/^ey/);
    });

});