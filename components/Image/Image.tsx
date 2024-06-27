import placeholder from '@/assets/profile.png';
import Image from 'next/image'


export default function ImageView(props: any) {
    const fallback = props?.imageFallback ? props?.imageFallback : placeholder
    return (
        <Image
            {...props}
            src={props?.src ? props?.src : fallback}
            alt="user image"
            width={props?.width ? props?.width : 50}
            height={props?.height ? props?.height : 50}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = fallback
            }}
        />
    )
}