import { Dialog } from '../../../components/ui/Dialog';
import { Button } from '../../../components/ui/Button';
import { useDeleteLink } from '../hooks/useDeleteLink';

interface Props {
  open: boolean;
  onClose: () => void;
  linkId: string;
  shortUrl: string;
}

export function DeleteDialog({ open, onClose, linkId, shortUrl }: Props) {
  const mutation = useDeleteLink();

  const handleConfirm = () => {
    mutation.mutate(linkId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} title="Delete this link?">
      <p className="text-sm text-text-secondary mb-6">
        This will disable{' '}
        <span className="font-mono text-text">{shortUrl}</span>.
        Clicks will still be recorded for analytics.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          loading={mutation.isPending}
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
}