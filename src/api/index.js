import requests from './request';

function createOpenai(message) {
  var raw = JSON.stringify({
    payload: {
      messages: message,
    },
    model: 'gpt-4o',
  });

  const headers = {
    'Content-Type': 'application/json',
    Channel: 'ai',
  };
  if (window.g_app_jwt) {
    headers.Authorization = `Bearer ${window.g_app_jwt}`;
  }

  return requests({
    url: 'https://ai.imgkits.com/api/chat/create', //azure
    data: raw,
    method: 'POST',
    headers: headers,
  });
}

function getOpenaiResult(taskId) {
  return requests({
    url: 'https://api.imgkits.com/api/chat/result', //azure
    data: {
      jobId: taskId,
    },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { createOpenai, getOpenaiResult };
