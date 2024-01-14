import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
// import PasswordModal from './PasswordModal';
import { ProfileContextProvider, useProfileContext } from 'contexts/profile';
import ViewProfile from './ViewProfile';
import PasswordModal from './PasswordModal';
import UpdateProfile from './UpdateProfile';
// import UpdateProfile from './UpdateProfile';

const Visibility = ({ isOpen, children }) => {
    const show = isOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
    return <div style={show}>{children}</div>;
};
const Profile = ({ config }) => {
    const { state } = useProfileContext();
    const { update, read } = state;

    return (
        <div>
            <Visibility isOpen={read.isOpen}>
                <ViewProfile config={config} />
            </Visibility>
            <Visibility isOpen={update.isOpen}>
                <UpdateProfile config={config} />
            </Visibility>
            <PasswordModal />
        </div>
    );
}

const ProfileLayout = ({ config }) => {
    return (
        <ProfileContextProvider>
            <Layout className="site-layout">
                <Content
                    className="whiteBox shadow layoutPadding"
                    style={{
                        margin: '40px auto',
                        width: '100%',
                        maxWidth: '1100px',
                    }}
                >

                    <Profile config={config} />

                </Content>
            </Layout>
        </ProfileContextProvider>
    )
}

export default ProfileLayout