import { Container, Grid } from '@mui/material';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { Soji } from './soji';


export function SojiItem(props: Soji) {
    const { name, image, animation_url } = props;
    const audio = new Audio(animation_url);
    
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);

    return <Grid item
        ref={hoverRef}
        onClick={() => { audio.play(); }}
    >
        <Container style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            background: isHover ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.20)",
            padding: "0px 10px",
            height: 50,
            border: "1px solid #fff",
            color: "white",
            borderRadius: "4px"
        }}>
            <img src={image} alt={name} style={{ width: 30, height: 30 }} />
            <span style={{ padding: 10 }}>{name}</span>
        </Container>
    </Grid>;
}
