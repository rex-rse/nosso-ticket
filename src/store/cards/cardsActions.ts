import { SNACKBAR_OPEN } from 'store/actions'
// import { axiosRequest } from 'store/axios'
import { TCardsProps } from 'types/index'
import { CardRegional } from 'types/types'

export const listCards = (payload) => ({
    type: 'LIST_CARDS',
    payload,
})

export const addCards = (payload) => ({
    type: 'ADD_CARDS',
    payload,
})

export const updateCards = (payload) => ({
    type: 'UPDATE_CARDS',
    payload,
})

// async request
export const getCardsRequest = () => {
    return async (dispatch) => {
        try {
            // const { data } = await axiosRequest('post', 'card_category/get/', {
            //     _all_: true,
            // })
            // if (data.message === 'Operación Exitosa')
            dispatch(listCards({}))
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}

export const createCardsRequest = (cardsData: CardRegional) => {
    return async (dispatch) => {
        try {
            // console.log('cardsData', cardsData)
            // const { data } = await axiosRequest
            //     'post',
            //     'card_category/create/',
            //     cardsData
            // )

            dispatch(addCards(cardsData))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tarjeta creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}

export const updateCardsRequest = (cardsData: TCardsProps) => {
    return async (dispatch) => {
        try {
            // const { data } = await axiosRequest(
            //     'put',
            //     'card_category/update/',
            //     cardsData
            // )
            dispatch(updateCards(cardsData))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tarjeta actualizada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            console.log('error update ', error)

            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}
