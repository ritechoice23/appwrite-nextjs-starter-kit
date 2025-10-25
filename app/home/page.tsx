import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import WelcomeMessage from './partials/welcome-message';

function HomePage() {

    return (
        <AuthenticatedLayout>
            <div className='p-5'>
                <WelcomeMessage />
            </div>
        </AuthenticatedLayout>
    );
}

export default HomePage;