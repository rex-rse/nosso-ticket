import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Button,
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'

import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from 'graphql/Mutations'
import { SNACKBAR_OPEN } from 'store/actions'

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
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
        },
    },
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    name: string
    last_name: string
    email: string
    number_phone: string
    type_document: string
    number_document: number
    used_title: boolean
    balance_title: boolean
}

const Schema = yup.object().shape({
    name: yup.string().required('Este campo es obligatorio'),
    last_name: yup.string().required('Este campo es obligatorio'),
    email: yup.string().required('Este campo es obligatorio'),
    number_phone: yup.string().required('Este campo es obligatorio'),
    type_document: yup.string().required('Este campo es obligatorio'),
    number_document: yup.string().required('Este campo es obligatorio'),
    used_title: yup.boolean(),
    balance_title: yup.boolean(),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const ProfileUser = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const login = useSelector((state: DefaultRootStateProps) => state.login)
    //mutation
    const [updateUser, { loading }] = useMutation(UPDATE_USER)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [usedTitle, setUsedTitle] = React.useState<boolean>(true)

    const [balanceTitle, setBalanceTitle] = React.useState<boolean>(true)
    // const [dataUser, setDataUser] = React.useState<any>([])

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name

        if (name === 'used_title') {
            setUsedTitle(!usedTitle)
            setValue(name, !usedTitle)
        }

        if (name === 'balance_title') {
            setBalanceTitle(!balanceTitle)
            setValue(name, !balanceTitle)
        }
    }

    const typesDocument = [
        {
            label: 'J',
            value: 'J',
        },
        {
            label: 'V',
            value: 'V',
        },
        {
            label: 'G',
            value: 'G',
        },
        {
            label: 'E',
            value: 'E',
        },
    ]

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        //     setValue('transportation_mean', fleetData?.transportation_mean, {
        //         shouldValidate: true,
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const resolve = await updateUser({
                variables: {
                    data: {
                        _id: login.user._id,
                        docCode: data.type_document,
                        docNum: data.number_document,
                        email: data.email,
                        lastname: data.last_name,
                        name: data.name,
                        password: '1234',
                    },
                },
            })
            console.log(resolve.data.updateUser)
            // setDataUser('')
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexión',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
            console.log(error)
        }
    }

    return (
        <>
            {loading ? 'cargando' : null}
            <Grid item xs={12}>
                <Typography variant="h4">Datos de usuario</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ marginTop: '5px' }}
                >
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth>
                        {/* <Grid item xs={12}>
                            <label htmlFor="containedButtonFile">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="containedButtonFile"
                                    multiple
                                    type="file"
                                />

                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<UploadTwoToneIcon />}
                                >
                                    Cargar Imagen
                                </Button>
                            </label>
                        </Grid> */}

                        {/* <Grid item xs={12} sx={{ marginLeft: '17px' }}>
                            <Typography variant="caption">
                                <ErrorTwoToneIcon
                                    className={classes.alertIcon}
                                />
                                El tamaño de la imagen no debe pesar mas de
                                125kb max.
                            </Typography>
                        </Grid> */}
                    </Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAbleToEdit}
                                >
                                    Editar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="name"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Nombres"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        // defaultValue={fleetData?.transportation_mean}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Apellidos"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        // defaultValue={fleetData?.make}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Correo electrónico"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="number_phone"
                        control={control}
                        // defaultValue={fleetData?.model}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    fullWidth
                                    label="Número de contacto"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.number_phone}
                                    helperText={errors.number_phone?.message}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="type_document"
                        control={control}
                        // defaultValue={fleetData?.plate}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo de documento"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.type_document}
                                    helperText={errors.type_document?.message}
                                >
                                    {typesDocument.map((option) => (
                                        <MenuItem
                                            key={option.label}
                                            value={option.label}
                                        >
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="number_document"
                        control={control}
                        // defaultValue={fleetData?.vin}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Documento de identidad"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    disabled={readOnlyState}
                                    error={!!errors.number_document}
                                    helperText={errors.number_document?.message}
                                ></TextField>
                            </Grid>
                        )}
                    />
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Notificaciones</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                        }}
                    >
                        <Controller
                            name="used_title"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value={usedTitle || ''}
                                    name="used_title"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleSwitch}
                                            value={usedTitle}
                                            checked={usedTitle}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Recibir cuando el titulo sea usado"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                        }}
                    >
                        <Controller
                            name="balance_title"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value={balanceTitle || ''}
                                    name="balance_title"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleSwitch}
                                            value={balanceTitle}
                                            checked={balanceTitle}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Recibir por bajo balance en el titulo"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <AnimateButton>
                                        <Button
                                            // variant="contained"
                                            size="medium"
                                            onClick={handleCancelEdit}
                                            className="mx-4"
                                            color="error"
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Aceptar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            ) : null}
                            {readOnly ? null : (
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Actualizar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default ProfileUser
