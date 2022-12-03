import React from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import card1img from '../img/card1-house-entry-vestaxx.jpg';
import card2img from '../img/card2-kitchen-vestaxx.jpg';
import card3img from '../img/card3-family-vestaxx.jpg';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: ({ color }) => ({
    minWidth: 195,
    borderRadius: 5,
    boxShadow: 'none',
    borderColor: '1px solid darkorange',
    '&:hover': {
      boxShadow: `0 6px 10px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.2)}`,
    },
  }),
  content: () => {
    return {
      backgroundColor: 'white',
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontSize: '1rem',
    color: 'darkorange',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'darkorange',
    opacity: 0.87,
    marginTop: '1.1rem',
    fontWeight: 500,
    fontSize: 14,
  },
}));

const CustomCard = ({ classes, image, title, subtitle }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const SolidGameCardDemo = React.memo(function SolidGameCard() {
  const gridStyles = useGridStyles();
  const styles = useStyles({ color: 'darkorange' });
  const styles2 = useStyles({ color: 'darkorange' });
  const styles3 = useStyles({ color: 'darkorange' });
  return (
    <>
      <Grid classes={gridStyles} container spacing={4} wrap={'nowrap'}>
        <Grid item>
          <CustomCard
            classes={styles}
            title={'Innovation'}
            subtitle={'vestaxx'}
            image={card1img}
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles2}
            title={'Planung'}
            subtitle={'vestaxx'}
            image={card2img}
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles3}
            title={'Heizung'}
            subtitle={'vestaxx'}
            image={card3img}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default SolidGameCardDemo;
