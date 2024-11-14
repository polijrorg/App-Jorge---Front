import { StatusBar } from 'expo-status-bar';
import * as S from './styles';

export default function DefaultHeader() {
    return (
        <S.Wrapper>
            <StatusBar style="light" />
            <S.Logo source={require('@assets/images/WhiteLogo.png')}/>
        </S.Wrapper>
    );
}