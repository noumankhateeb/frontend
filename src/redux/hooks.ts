import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<any> = useSelector;
export const useAppDispatch = () => useDispatch<any>();