// material-ui
import { styled } from '@material-ui/core/styles'

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.primary.light,
    minHeight: '100vh',
}))

export default AuthWrapper1
