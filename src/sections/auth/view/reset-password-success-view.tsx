import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { SentIcon } from 'src/assets/icons';
import { RouterLink } from 'src/routes/components';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

// ----------------------------------------------------------------------

export default function ResetPasswordSuccessView() {
  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Reset password email sent!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We have sent a password reset link to your email address.
          <br />
          Please check your inbox and click on the link to reset your password.
        </Typography>
      </Stack>
    </>
  );

  const renderActions = (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {"Didn't receive the email? Check your spam folder or"}
        <Link
          variant="subtitle2"
          component={RouterLink}
          href={paths.auth.forgotPassword}
          sx={{
            cursor: 'pointer',
            px: 1,
          }}
        >
          try again
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <LeftIcon width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  return (
    <>
      {renderHead}
      {renderActions}
    </>
  );
}
