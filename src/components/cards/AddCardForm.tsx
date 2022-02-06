import {
    useForm,
    // SubmitHandler,
    Controller,
    // SubmitErrorHandler,
} from 'react-hook-form'
import { Button, TextField, Theme } from '@material-ui/core'
import AlertDialog from 'components/AlertDialog'
import CardsInfo from './CardsInfo'
import { makeStyles } from '@material-ui/styles'
import Card1 from 'components/icons/Card1'

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

const handleAccept = () => {
    console.log('accept')
}
const RechargeCardForm = ({ open, setOpen }) => {
    const classes = useStyles()

    const {
        // handleSubmit,
        control,
        // formState: { errors, dirtyFields },
        // setValue,
        // getValues,
    } = useForm({
        // resolver: yupResolver(Schema),
    })
    return (
        <>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                handleAccept={handleAccept}
                title="Agregar Tarjeta"
                acceptButtonText="Aceptar"
            >
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="">
                            <Card1 />
                        </div>
                        <div className={classes.searchControl}>
                            <Controller
                                name="description"
                                control={control}
                                // defaultValue={cardsData?.description || ''}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mt-4"
                                        fullWidth
                                        label="Nombre del Titular"
                                        size="small"
                                        autoComplete="off"
                                        // error={!!errors.description}
                                        // helperText={errors.description?.message}
                                        // disabled={readOnlyState}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className={classes.searchControl}>
                            <div className="flex items-center">
                                <Controller
                                    name="description"
                                    control={control}
                                    // defaultValue={cardsData?.description || ''}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mx-4"
                                            fullWidth
                                            label="Código del Titular"
                                            size="small"
                                            autoComplete="off"
                                            // error={!!errors.description}
                                            // helperText={errors.description?.message}
                                            // disabled={readOnlyState}
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    className="h-8"
                                    size="small"
                                    // onClick={handleAccept}
                                    autoFocus
                                >
                                    Buscar
                                </Button>
                            </div>
                            <CardsInfo
                                card_money="wqe"
                                init_time="wqe"
                                issue_time="wqe"
                            />
                        </div>
                    </div>
                </div>
            </AlertDialog>
        </>
    )
}

export default RechargeCardForm