import Box from '@mui/material/Box';

// -------------------------------------

interface BMIResultPointProps {
  bmiPosition: number;
}

export default function BMIResultPoint({ bmiPosition }: BMIResultPointProps) {
  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          height: 30,
          left: `${bmiPosition}%`,
          transform: 'translate(-50%, -4px)',
        }}
      >
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'black',
            }}
          />
        </Box>
      </Box>
    </div>
  );
}
