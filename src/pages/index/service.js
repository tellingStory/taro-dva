import Request from '../../utils/request';

export const demo = (data) => {
    return Request({
        url: '/',
        method: 'POST',
        data,
    });
};
