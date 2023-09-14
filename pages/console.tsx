import { useAuth } from '@clerk/nextjs';
import { Container, Flex, Select, Text, Title, useMantineTheme } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ApiKeys, { ApiKeyData } from '../components/ApiKeys';
import Buckets, { BucketMetadata } from '../components/Buckets';
import MenuBar from '../components/MenuBar';

export interface ListApiKeysResponse {
    keys: ApiKeyData[] | null;
}

const BlyssEnvironments = [
    { value: "https://alpha.api.blyss.dev", label: 'alpha' },
    { value: "https://dev2.api.blyss.dev", label: 'dev2' },
    { value: "https://staging.api.blyss.dev", label: 'staging' },
    { value: "http://localhost:8000", label: 'local' }
];

interface EnvSelectorProps {
    apiEndpoint: string;
    setApiEndpoint: Dispatch<SetStateAction<string>>;
}

const EnvSelector = ({ apiEndpoint, setApiEndpoint }: EnvSelectorProps) => {
    return (
        <Flex direction="column" align="flex-start" gap={10}>

            <Title order={2} color="white">
                API Endpoint
            </Title>
            <Flex justify="flex-start" align="center" gap={10}>
                <span>Region:</span>
                <Select
                    data={BlyssEnvironments}
                    value={apiEndpoint}
                    onChange={(value) => {
                        if (value !== null) {
                            setApiEndpoint(value);
                        }
                    }} />
            </Flex>
            <Text>URL: {apiEndpoint}</Text>
        </Flex>

    );
};
async function getApiKeys(apiEndpoint: string, jwt: string): Promise<ListApiKeysResponse> {
    const res = await fetch(apiEndpoint + '/list-api-keys', {
        method: 'get',
        headers: new Headers({
            Authorization: jwt
        })
    });
    if (!res.ok) {
        return { keys: null };
    }

    const data = await res.json();
    return data as ListApiKeysResponse;
}



export type ListBucketsResponse = {
    buckets: BucketMetadata[] | null;
};

async function listBuckets(apiEndpoint: string, apiKey: string): Promise<ListBucketsResponse> {
    const res = await fetch(apiEndpoint + '/list-buckets', {
        method: 'get',
        headers: new Headers({
            'x-api-key': apiKey
        })
    });

    if (!res.ok) {
        return { buckets: null };
    }

    const data = await res.json();
    return data as ListBucketsResponse;
}

export default function SSRPage() {
    const [apiEndpoint, setApiEndpoint] = useState(BlyssEnvironments[0].value);
    const [apiKeys, setApiKeys] = useState<ApiKeyData[] | null>([]);
    const [buckets, setBuckets] = useState<BucketMetadata[] | null>([]);
    const { getToken, isLoaded, isSignedIn, signOut } = useAuth();

    // Fetch token, API keys, and buckets on mount
    useEffect(() => {
        const asyncEffect = async () => {
            const token = await getToken({ template: 'blyss' });
            if (!token || !apiEndpoint) {
                return;
            }
            console.log('token', token);
            const keysResp = await getApiKeys(apiEndpoint, token);
            console.log('keys', keysResp);
            setApiKeys(keysResp.keys);
            // retrieve buckets for the first key, or null if no keys
            let buckets: BucketMetadata[] | null = null;
            if (keysResp.keys && keysResp.keys[0] && keysResp.keys[0].secret) {
                const listResp = await listBuckets(apiEndpoint, keysResp.keys[0].secret);
                buckets = listResp.buckets;
            }
            setBuckets(buckets);
            console.log('buckets', buckets);
        };
        asyncEffect().catch((err) => {
            console.error(err);
        });
    }, [isSignedIn, apiEndpoint]);

    const theme = useMantineTheme();

    return (
        <Container size={1172} >
            <Flex justify="flex-start" rowGap={50} align="flex-start" direction="column" >
                <MenuBar />

                <EnvSelector apiEndpoint={apiEndpoint} setApiEndpoint={setApiEndpoint} />

                <ApiKeys apiKeys={apiKeys} />
                <Buckets buckets={buckets} />
            </Flex>
        </Container>
    );
}

