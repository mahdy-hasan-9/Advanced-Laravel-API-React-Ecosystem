import img from '../../assets/images/placeholder.png';

interface DefaultImageProps {
    width?: number | string;
    height?: number | string;
}

const DefaultImage = ({ width = '100%', height = '100%' }: DefaultImageProps) => {
    return (
        <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                src={img} 
                alt="default-image" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
        </div>
    );
};

export default DefaultImage;