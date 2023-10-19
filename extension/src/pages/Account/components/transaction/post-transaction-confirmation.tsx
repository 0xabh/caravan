import React, {useEffect, useState} from 'react';
import {
    PostTransactionConfirmation,
    PostTransactionConfirmationtProps,
} from '../types';
import {
    Box, CardActions,
    CircularProgress,
    Container,
    FormControl, FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Stack, Typography
} from '@mui/material';
import {Error, Visibility, VisibilityOff} from "@mui/icons-material";
import PrimaryButton from "../PrimaryButton";
import {useBackgroundDispatch, useBackgroundSelector} from "../../../App/hooks";
import {
    selectKeyringPasswordValidated,
    selectKeyringStatus
} from "../../../Background/redux-slices/selectors/keyringsSelectors";
import {resetPasswordValidation, validateUser} from "../../../Background/redux-slices/keyrings";

const PostTransactionConfirmationComponent: PostTransactionConfirmation = ({
                                                                               onComplete,
                                                                           }: PostTransactionConfirmationtProps) => {
    const keyringState = useBackgroundSelector(selectKeyringPasswordValidated);
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const backgroundDispatch = useBackgroundDispatch();

    useEffect(() => {
        console.log("keyringState", keyringState)
        if(keyringState === 1){
            onComplete()
            backgroundDispatch(resetPasswordValidation())
        }
        if(keyringState === 2){
            setShowLoader(false)
        }
    }, [keyringState]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <Container
            sx={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <FormGroup sx={{p: 2, pt: 4}}>
                <FormControl sx={{m: 1}} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </FormGroup>
            <CardActions sx={{ width: '100%', pl: 2, pr: 2, pt: 0 }}>
                <Stack spacing={2} sx={{ width: '100%', pl: 2, pr: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                        <PrimaryButton
                            sx={{ width: '100%' }}
                            disabled={
                                password.length === 0 ||
                                showLoader
                            }
                            size="large"
                            variant="contained"
                            onClick={() => {
                                setShowLoader(true)
                                backgroundDispatch(validateUser(password))
                            }}
                        >
                            Enter Password
                        </PrimaryButton>
                        {showLoader && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                        {keyringState === 2 && (
                            <Box>
                                <Typography variant={"button"} color={"red"}>Incorrect Password</Typography>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </CardActions>
        </Container>
    );
};

export default PostTransactionConfirmationComponent;
