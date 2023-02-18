import {styled} from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";

export const PaperCss = styled(Paper)({
    padding: '10px',
    background: '#363639',
    border:'1px solid #424244',
    borderRadius:'10px',
    display:'flex',
    flexDirection:'column',
    gap:'10px'

})

export const CustomTextField = styled(TextField)({

    background: 'rgba(145, 158, 171, 0.08)',

    fontSize: 10,

    width: '100%',

    borderRadius: 4,
    '& .MuiInputBase-input': {
        color: 'white',
        fontFamily:'Didact Gothic',
    },
    '& label.Mui-focused': {
        color: '#d7d4d4',
        fontFamily:'Didact Gothic',
    },
    '& label': {
        color: '#d7d4d4',
        fontFamily:'Didact Gothic',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(145, 158, 171, 0.01)',

        },
        '&.Mui-error fieldset': {
            borderColor: 'rgba(145, 158, 171, 0.01)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(145, 158, 171, 0.01)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(145, 158, 171, 0.01)',

        },
    },

    '& .MuiFormHelperText-root.Mui-error': {
        color: '#d2d2d2',
        fontFamily:'Didact Gothic',
        marginBottom:'10px'
    },

})

export const CustomCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: #666; /* change color */

    &.Mui-checked {
      color: #b6e56c; /* change active color */
    }
  }
`;

export const CustomButton = styled(Button)({
    color: '#969691', /* change text color */
    borderColor: '#656460', /* change border color */
    '&:hover': {
        borderColor: '#c2be6c', /* change border color on hover */
    },
});

export const CustomFormControlLabel = styled(FormControlLabel)({
    '& .MuiFormControlLabel-label': {
        '& *': {
            color: 'inherit',
        },
        '& > *:first-of-type': {
            color: '#4caf50',
        },
    },
});