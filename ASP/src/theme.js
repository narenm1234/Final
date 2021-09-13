import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    palette: {
    },
    overrides: {
        MuiOutlinedInput: {
            input: {
                padding: '8px 14px' // Material UI upgrade to v4.x broke this
            },
        },
    },
})
export default theme