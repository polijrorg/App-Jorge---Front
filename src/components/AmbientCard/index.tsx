import * as S from './styles';

export default function AmbientCard({ image, title, onPress }) {
    return (
        <S.Wrapper>
            <S.Card onPress={onPress}>
                <S.Logo style={{ tintColor: 'rgba(0, 0, 0, 1)' }} source={image}/>
            </S.Card>
            <S.Title>{title}</S.Title>
        </S.Wrapper>
        
    );
}