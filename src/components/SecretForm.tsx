import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../lib/api';
import { encrypt, generateEncryptionKey, generateSalt } from '../lib/crypto';
import { useSecretStore } from '../store/secretStore';
import { Card } from './Card';
import { CreateButton } from './CreateButton';
import Editor from './Editor';
import { Modal } from './Modal';
import { SecuritySettings } from './SecuritySettings';
import { TitleField } from './TitleField';

export function SecretForm() {
    const {
        secret,
        title,
        password,
        setSecretIdAndKeys,
        setSecretData,
    } = useSecretStore();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);

        const encryptionKey = generateEncryptionKey(password);
        const salt = generateSalt();

        const fileIds: string[] = [];

        const encryptedSecret = await encrypt(secret, encryptionKey, salt);
        const encryptedTitle = await encrypt(title, encryptionKey, salt);

        // Transform empty strings to null for nullable fields
        const dataToSend = {
            secret: encryptedSecret,
            title: encryptedTitle,
            salt,
            password: password ? encryptionKey : '',
            // Activato policy: locked values
            expiresAt: 259200, // 3 days
            views: 1,
            isBurnable: false,
            ipRange: null,
            fileIds,
        };

        try {
            const response = await api.secrets.$post({ json: dataToSend });
            const data = await response.json();

            if (response.ok && data?.id) {
                setSecretIdAndKeys(data.id, encryptionKey, password);
            } else {
                const errorMessage =
                    data?.error?.issues?.[0]?.message ||
                    data?.error?.message ||
                    'An unknown error occurred.';
                setErrorMessage(
                    t('secret_form.failed_to_create_secret', { errorMessage: errorMessage })
                );
                setIsErrorModalOpen(true);
            }
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : 'An unknown error occurred.';
            setErrorMessage(
                t('secret_form.failed_to_create_secret', { errorMessage: errorMessage })
            );
            setIsErrorModalOpen(true);
            console.error('Failed to create secret:', errorMessage);
            // Handle error, e.g., show a toast notification
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = secret.trim().length > 0;

    return (
        <div className="space-y-6">
            <Card hover>
                <Editor value={secret} onChange={(value) => setSecretData({ secret: value })} />

                <div className="mt-5">
                    <TitleField
                        value={title}
                        onChange={(value) => setSecretData({ title: value })}
                    />
                </div>

                {/* Quick create button */}
                <div className="mt-5 flex justify-end">
                    <CreateButton
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        disabled={!isFormValid}
                    />
                </div>
            </Card>

            <SecuritySettings />

            {/* Create button */}
            <CreateButton onSubmit={handleSubmit} isLoading={isLoading} disabled={!isFormValid} />
            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title={t('common.error')}
                confirmText={t('common.ok')}
                onConfirm={() => setIsErrorModalOpen(false)}
            >
                <p>{errorMessage}</p>
            </Modal>
        </div>
    );
}
