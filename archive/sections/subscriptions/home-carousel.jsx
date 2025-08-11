import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { bgGradient } from 'src/theme/css';
import { useRouter } from 'src/routes/hooks';
import TextMaxLine from 'src/components/text-max-line';
import { useResponsive } from 'src/hooks/use-responsive';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function CarouselCategory({ data }) {
  const { lang } = useLocales();

  const carousel = useCarousel({
    slidesToShow: data?.categories?.length < 4 ? data.categories.length : 4,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        mt: 5,
      }}
    >
      <Typography variant="h2">{data.title[lang]}</Typography>
      <CarouselArrows
        filled
        icon="mingcute:right-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        dataLength={data.categories.length || 1}
      >
        <Box sx={{ mt: 2 }}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.categories.map((category) => (
              <Box key={category._id} sx={{ px: { xs: 0.3, md: 1 } }}>
                <CarouselItem item={category} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </CarouselArrows>
    </Box>
  );
}

CarouselCategory.propTypes = {
  data: PropTypes.object,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { lang } = useLocales();
  const theme = useTheme();
  const router = useRouter();

  const { coverUrl, title, path } = item;

  const mdUp = useResponsive('up', 'md');
  const isRTL = theme.direction === 'rtl';

  return (
    <Paper
      onClick={() => router.push(paths.product.category(path))}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Image alt={title.en} src={coverUrl} ratio={mdUp ? '4/3' : '1/1'} />

      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} ${isRTL ? '85%' : '15%'}`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      >
        <TextMaxLine variant="h3" sx={{ mb: 0 }}>
          {title[lang]}
        </TextMaxLine>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
