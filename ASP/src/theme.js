import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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